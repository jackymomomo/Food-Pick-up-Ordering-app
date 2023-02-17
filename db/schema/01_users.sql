
DROP TABLE IF EXISTS menu_item CASCADE;
DROP TABLE IF EXISTS order_menu_item CASCADE;
DROP TABLE IF EXISTS order_status CASCADE;
DROP TABLE IF EXISTS menu_item2 CASCADE;


CREATE TABLE menu_item (
  id SERIAL PRIMARY KEY NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  appetizer BOOLEAN NOT NULL,
  main BOOLEAN NOT NULL,
  soup BOOLEAN NOT NULL,
  description VARCHAR(255) NOT NULL,
  vegetarian BOOLEAN NOT NULL
);

CREATE TABLE menu_item2 (
  id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  appetizer BOOLEAN NOT NULL,
  main BOOLEAN NOT NULL,
  soup BOOLEAN NOT NULL,
  description TEXT NOT NULL,
  vegetarian BOOLEAN NOT NULL
);

CREATE TABLE order_menu_item (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  qty_ordered INT NOT NULL
  );

CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

CREATE TABLE food_order (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INT NOT NULL,
  customer_phone VARCHAR(255) NOT NULL,
  order_status order_status NOT NULL,
  order_date_time TIMESTAMP NOT NULL,
  total_amount INT NOT NULL
);


-- FOREIGN KEY (order_id) REFERENCES food_order(id),
--   FOREIGN KEY (menu_item_id) REFERENCES menu_item(id)

