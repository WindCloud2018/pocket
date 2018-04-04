const db = require('../db/config');

module.exports = {

  findAllCat() {
    return db.many(`
      SELECT *
      FROM categories
      ORDER BY category_id ASC
    `);
  },

  findCatById(id) {
    return db.one(`
      SELECT * FROM categories
      WHERE id = $1
    `,id);
  }




};
