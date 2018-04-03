const categoryDB = require('../models/categoriesDB');


module.exports = {
  index(req, res, next) {
    categoryDB.findAllCat()
      .then((categories) => {
        res.status(200).json({
          data: { categories },
        });
      })
      .catch(err => next(err));
  },

  getOne(req, res, next) {
    categoryDB.findCatById(req.params.id)
      .then((category) => {
        res.json({
          message: 'find one success',
          data: { category },
        });
      })
      .catch(err => next(err));
  },

};
