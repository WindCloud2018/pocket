const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
      FROM expenses
      ORDER BY data_created ASC
    `);
  },

  save(expense) {
  // console.log('this is landmark in model:', landmarks);
  console.log('models')
  return db.one(`
     INSERT INTO expenses (amount, description,  category_id) VALUES ($1 ,$2 ,$3, $4) RETURNING *
    `, [expense.amount, expense.description, expense.category_id]);
  },

  update(expense, id) {
    return db.one(`
      UPDATE expenses
      SET
        amount = $/amount/,
        description = $/description/,
        category_id = $/category_id/
      WHERE id = $/id/
      RETURNING *
    `[expense.amount, expense.description, expense.category_id]);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM expenses
      WHERE id = $1
    `, id);
  },

};
