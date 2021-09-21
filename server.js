const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env);

//  START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
