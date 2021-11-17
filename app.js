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
  req.requestTime = new Date().toISOString();
  next();
});

// 2)  ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// Exception Route Handler
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find the ${req.url} on this server!`,
  });
});

module.exports = app;
