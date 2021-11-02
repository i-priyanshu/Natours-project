const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DATABASE connected!');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//Importing Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully Loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Deleting all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Successfully Deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
  console.log('Imported Data!');
} else if (process.argv[2] === '--delete') {
  deleteData();
  console.log('Deleted Data!');
}

console.log(process.argv);
