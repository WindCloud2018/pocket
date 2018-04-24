const express = require('express');

const expenseRoutes = express.Router();

const expenseController = require('../controllers/expensecontroller');


expenseRoutes.route('/:id')
  .get(expenseController.expenseGetOne)
  .put(expenseController.expenseUpdate)
  .delete(expenseController.expenseDestroy);

expenseRoutes.route('/')
  .get(expenseController.expenseIndex)
  .post(expenseController.expenseCreate);

module.exports = expenseRoutes;
