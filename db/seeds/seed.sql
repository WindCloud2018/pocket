\c pocket_db;

INSERT INTO categories(category)
  VALUES
  (
    'Rent'
  ),
  (
    'Mortgage'
  ),
  (
    'Loans'
  ),
  (
    'Utilities'
  ),
  (
    'Restaurants'
  ),
  (
    'Groceries'
  ),
  (
    'Entertainment'
  ),
  (
    'Travel'
  ),
  (
    'Vacation'
  ),
  (
    'Miscellaneous'
  )
  ;

INSERT INTO expenses(amount, description, category_id)
  VALUES
  (
    500,
    'GA Loans',
    3
  ),
  (
    2000,
    'Monthly Rent',
    1
  ),
  (
    250,
    'Verizon Cellphone Bill',
    4
  ),
  (
    100,
    'Cab Rides',
    8
  ),
  (
    150,
    'Groceries',
    6
  );
