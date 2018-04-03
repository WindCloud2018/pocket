const expensesDB = require('../models/expensesDB');

module.exports = {

  expenseIndex(req, res, next) {
    expensesDB.findAll()
      .then((expenses) => {
        res.status(200).json({
          data: { expenses }
        });
      })
      .catch(err => next(err));
  },

  expenseGetOne(req, res, next) {
    expensesDB.findById(req.params.id)
      .then((expense) => {
        res.json({
          message: 'get one success',
          data: { expense },
        });
      })
      .catch(err => next(err));
  },

  expenseCreate(req, res, next) {
    console.log(req.body);
    expensesDB.save({
      amount: req.body.amount,
      description: req.body.description,
      category_id: req.body.category_id,
    })
      .then((expenses) => {
        res.json({
          message: 'expense added successfully!',
          data: { expense },
        });
      })
      .catch(err => next(err));
  },

  expenseUpdate(req, res, next) {
    expensesDB.update({
      amount: req.body.amount,
      description: req.body.description,
      category_id: req.body.category_id,
    })
    .then((expense) => {
      res.json({
        message: 'expense update success',
        data: { expense },
      });
    })
    .catch(err => next(err));
  },

  expenseDestroy(req, res, next) {
    expensesDB.destroy(req.params.id)
    .then(() => {
      res.json({
        message: 'expense has been deleted!',
      });
    })
    .catch (err => next(err));
  },
};







