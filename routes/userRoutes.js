const express = require('express');
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController');

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.get('/logout', authController.logout);
Router.post('/forgotPassword', authController.forgotPassword);
Router.patch('/resetPassword/:token', authController.resetPassword);

// PROTECT all routes after this middleware
Router.use(authController.protect);

Router.patch('/updateMyPassword', authController.updatePassword);
Router.get('/me', userController.getMe, userController.getUser);
Router.patch('/updateMe', userController.updateMe);
Router.delete('/deleteMe', userController.deleteMe);

// Restrcit all Routes below to "ADMIN" only.
Router.use(authController.restrictTo('admin'));

Router.route('/').get(userController.getAllUsers);

Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
