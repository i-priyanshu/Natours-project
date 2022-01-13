const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(201).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});

exports.createNewRev = catchAsync(async (req, res, next) => {
  const newRev = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newRev,
    },
  });
});
