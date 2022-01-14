const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.DeleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No Document found with that ID'), 404);
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.UpdateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('No document found with that Id.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.CreateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
