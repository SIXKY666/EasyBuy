-- Create Customers table
CREATE TABLE Customers (
    customer_id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    address TEXT,
    phone VARCHAR(20)
);
-- Create Sellers table
CREATE TABLE Sellers (
    seller_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    address TEXT,
    phone VARCHAR(20)
);

-- Create Categories table
CREATE TABLE Categories (
    category_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255)
);

-- Create Products table
CREATE TABLE Products (
    product_id VARCHAR(36) PRIMARY KEY,
    seller_id VARCHAR(36),
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    stock_quantity INT,
    category_id VARCHAR(36),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (seller_id) REFERENCES Sellers(seller_id)
);

-- Create Orders table
CREATE TABLE Orders (
    order_id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36),
    order_date DATE,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Create OrderItems table
CREATE TABLE OrderItems (
    order_item_id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36),
    product_id VARCHAR(36),
    quantity INT,
    item_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Create Payments table
CREATE TABLE Payments (
    payment_id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36),
    payment_date DATE,
    payment_method VARCHAR(50),
    amount DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
