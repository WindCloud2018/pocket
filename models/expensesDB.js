const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
      FROM expenses e
      INNER JOIN categories c on
        e.category_id = c.id
      ORDER BY data_created ASC
    `);
  },

  findByCategoryId(category_id) {
    return db.many(`
      SELECT * FROM expenses e
      WHERE e.category_id = $1
    `,id);
  },

  findById(id) {
    return db.one(`
      SELECT * FROM expenses e
      INNER JOIN categories c on e.category_id = c.id
      WHERE e.id = $1
    `, id);
  },

  save(expense) {
  // console.log('this is landmark in model:', landmarks);
  console.log('models')
  return db.one(`
     INSERT INTO expenses (amount, description,  category_id) VALUES ($1 ,$2 ,$3) RETURNING *
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
