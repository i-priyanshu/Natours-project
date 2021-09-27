const express = require('express');

const Router = express.Router();

const userController = require('../controllers/userController.js');

Router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .post(userController.deleteUser);

module.exports = Router;
