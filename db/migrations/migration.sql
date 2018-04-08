\c pocket_db;

DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category VARCHAR(64)
);

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  amount REAL NOT NULL,
  description VARCHAR(128) NOT NULL,
  category_id INT NOT NULL REFERENCES categories(category_id),
  expense_date TIMESTAMP NOT NULL DEFAULT NOW()
);
