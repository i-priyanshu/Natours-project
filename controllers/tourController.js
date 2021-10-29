const Tour = require('../models/tourModel');

exports.checkInput = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Fail',
      message: `This tour doesn't have valid properties!`,
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'Success',
  //   results: tour.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.CreateTour = (req, res) => {
  // console.log(req.body);
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.EditTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: '<Updated tour here...>',
    },
  });
};

exports.DeleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
