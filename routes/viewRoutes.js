const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);

router.get('/login', viewController.getLoginform);

module.exports = router;
