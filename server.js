const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

// :IMP: Uncaught Exception handler

process.on('uncaughtException', (err) => {
  console.log('unhandled Rejection! Shutting down....!');
  console.log(err.name, err.message);
  process.exit(1); // '1' stands for uncaught exception & '0' for success.
});

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
    console.log('DATABASE connected! 🥳');
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

//  :IMP:   Unhandled Rejection Errors

process.on('unhandledRejection', (err) => {
  console.log('unhandled Rejection! Shutting down....!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // '1' stands for uncaught exception & '0' for success.s
  });
});
