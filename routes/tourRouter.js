const express = require('express');
const tourController = require('../controllers/tourController.js');
const authController = require('../controllers/authController');
const router = express.Router();
// router.param('id', tourController.checkId);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.monthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.CreateTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.EditTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.DeleteTour
  );

module.exports = router;
