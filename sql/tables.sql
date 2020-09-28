DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE users
(
    user_id VARCHAR(36),
    user_name VARCHAR(60) NOT NULL,
    email_id VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    mobile_number CHAR(10) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE city(
    city_id VARCHAR(36),
    city_name VARCHAR(60) UNIQUE,
    PRIMARY KEY(city_id)
);

CREATE TABLE address(
    address_id VARCHAR(36),
    city_id VARCHAR(36) NOT NULL,
    street_name VARCHAR(60) NOT NULL,
    details TEXT,
    PRIMARY KEY(address_id),
    CONSTRAINT city
    FOREIGN KEY (city_id)
    REFERENCES city(city_id)
    ON DELETE CASCADE
);

CREATE TABLE user_address(
    user_id VARCHAR(36) NOT NULL,
    address_id VARCHAR(36) NOT NULL,
    CONSTRAINT user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,
    CONSTRAINT address
    FOREIGN KEY (address_id)
    REFERENCES address(address_id)
    ON DELETE CASCADE
);

CREATE TABLE catagory
(
    catagory_id VARCHAR(36),
    catagory_name VARCHAR(36) NOT NULL,
    PRIMARY KEY(catagory_id)
);

CREATE TABLE suppliers
(
    supplier_id VARCHAR(36),
    supplier_name VARCHAR(60) NOT NULL,
    image_id TEXT DEFAULT 'logo',
    city_id VARCHAR(36),
    email_id VARCHAR(255) NOT NULL UNIQUE,
    supplier_description VARCHAR,
    visible BOOLEAN DEFAULT FALSE,
    password VARCHAR(60) NOT NULL,
    catagory_id VARCHAR(36),
    contact_number VARCHAR(15),
    PRIMARY KEY(supplier_id),
    CONSTRAINT catagory
    FOREIGN KEY(catagory_id)
    REFERENCES catagory(catagory_id)
    ON DELETE SET NULL,
    CONSTRAINT supplier_city
    FOREIGN KEY(city_id)
    REFERENCES city(city_id)
    ON DELETE CASCADE
);



CREATE TABLE products
(
    product_id VARCHAR(36),
    product_name VARCHAR(40) NOT NULL,
    supplier_id VARCHAR(36) NOT NULL,
    product_catagory VARCHAR(40),
    image_id TEXT DEFAULT 'logo',
    available BOOLEAN DEFAULT TRUE,
    PRIMARY KEY(product_id),
    price INTEGER NOT NULL,
    CONSTRAINT price_check
    CHECK(price>0),
    CONSTRAINT supplier
    FOREIGN KEY(supplier_id)
    REFERENCES suppliers(supplier_id)
    ON DELETE CASCADE
);

CREATE TABLE employee
(
    employee_id VARCHAR(36) NOT NULL,
    employee_name VARCHAR(36) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    username VARCHAR(36) NOT NULL UNIQUE,
    added TIMESTAMP DEFAULT NOW(),
    password VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(employee_id)
);

CREATE TYPE order_status AS ENUM ('processing','delivering','delivered','cancelled');

CREATE TABLE orders(
    order_id VARCHAR(36),
    user_id VARCHAR(36) NOT NULL,
    order_status order_status DEFAULT 'processing' NOT NULL,
    payed BOOLEAN DEFAULT FALSE,
    address_id VARCHAR(36) NOT NULL,
    ordered_time TIMESTAMP DEFAULT NOW
(),
    PRIMARY KEY
(order_id),
    CONSTRAINT user_id
    FOREIGN KEY
(user_id)
    REFERENCES users
(user_id)
    ON
DELETE CASCADE,
CONSTRAINT address
    FOREIGN KEY (address_id)
    REFERENCES address(address_id)
    ON DELETE CASCADE
);

CREATE TABLE ordered_items
(
    ordered_item_id VARCHAR(36),
    product_id VARCHAR(36) NOT NULL,
    order_id VARCHAR(36) NOT NULL,
    quantity INTEGER,
    PRIMARY KEY(ordered_item_id),
    CONSTRAINT quantity_check
    CHECK(quantity>0),
    CONSTRAINT product_id
    FOREIGN KEY(product_id)
    REFERENCES products(product_id)
    ON DELETE CASCADE,
    CONSTRAINT order_id
    FOREIGN KEY(order_id)
    REFERENCES orders(order_id)
    ON DELETE CASCADE
);
