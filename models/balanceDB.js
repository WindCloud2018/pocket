const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
      FROM balances
      ORDER BY id DESC
    `);
  },

  save(balance) {
  // console.log('this is landmark in model:', landmarks);
  console.log('models')
  return db.one(`
     INSERT INTO balances (amount, description, asset, category_id) VALUES ($1 ,$2 ,$3, $4) RETURNING *
    `, [balance.amount, balance.description, balance.asset, balance.category_id]);
  },

  update(balance, id) {
    return db.one(`
      UPDATE landmarks
      SET
        amount = $/amount/,
        description = $/description/,
        asset = $/asset/,
        category_id = $/category_id/
      WHERE id = $/id/
      RETURNING *
    `[balance.amount, balance.description, balance.asset, balance.category_id]);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM balances
      WHERE id = $1
    `, id);
  },

};
