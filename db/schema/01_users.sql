-- Drop and recreate Users table (Example)

-- DROP TABLE IF EXISTS users CASCADE;
-- I understand what this statement does but am not clear why it's used



CREATE TABLE menu_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  item_name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  -- the price is listed in cents and not with a decimal
  appetizer BOOLEAN NOT NULL,
  main BOOLEAN NOT NULL,
  soup BOOLEAN NOT NULL
);

CREATE TABLE order_menu_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  qty_ordered INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES food_order(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_item(id)
);

CREATE TABLE food_order (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  customer_phone VARCHAR(255) NOT NULL,
  order_status ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL,
  order_date_time DATETIME NOT NULL,
  total_amount INT NOT NULL
);
