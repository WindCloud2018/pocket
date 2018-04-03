const express = require('express');

const balanceRoutes = express.Router();

const balanceController = require('../controllers/balancecontroller');

balanceRoutes.route('/')
  .get(balanceController.balanceIndex)
  .post(balanceController.balanceCreate);

module.exports = balanceRoutes;
