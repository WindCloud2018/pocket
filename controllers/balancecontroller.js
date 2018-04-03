const balanceDB = require('../models/balanceDB');

module.exports = {
  balanceIndex(req, res, next) {
    balanceDB.findAll()
      .then((balances) => {
        res.status(200).json({
          data: { balances }
        });
      })
      .catch(err => next(err));
  },

  balanceCreate(req, res, next) {
    console.log(req.body);
    balanceDB.save({
      amount: req.body.amount,
      description: req.body.description,
      asset: req.body.asset,
      category_id: req.body.category_id,
    })
      .then((balance) => {
        res.json({
          message: 'balance added successfully!',
          data: { balance },
        });
      })
      .catch(err => next(err));
  },
};
