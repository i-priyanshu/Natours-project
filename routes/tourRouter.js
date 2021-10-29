const express = require('express');
const tourController = require('../controllers/tourController.js');

const router = express.Router();
// router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkInput, tourController.CreateTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.EditTour)
  .delete(tourController.DeleteTour);

module.exports = router;
