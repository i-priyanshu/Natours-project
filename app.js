const express = require('express');
const tourRouter = require('./routes/tourRouter.js');
const userRouter = require('./routes/userRoutes.js');
const morgan = require('morgan');
const app = express();

//1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello form the Middleware!');
  next();
});

// 2)  ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
