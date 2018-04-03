\c pocket_db;

DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category VARCHAR(64)
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  amount INT NOT NULL,
  description VARCHAR(128),
  category_id INT REFERENCES categories(id),
  data_created TIMESTAMP NOT NULL DEFAULT NOW()
);
