const express = require('express');

const balanceRoutes = express.Router();

const balanceController = require('../controllers/balancecontroller');


balanceRoutes.route('/:id')
  .get(balanceController.getOne)
  .put(balanceController.update)
  .delete(balanceController.destroy)

balanceRoutes.route('/')
  .get(balanceController.balanceIndex)
  .post(balanceController.balanceCreate);

module.exports = balanceRoutes;
