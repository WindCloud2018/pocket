const express = require('express');

const categoryRoutes = express.Router();

const categoryController = require('../controllers/categorycontroller');

categoryRoutes.route('/')
  .get(categoryController.index);


module.exports= categoryRoutes;
