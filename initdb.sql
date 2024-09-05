-- Create the default database
CREATE DATABASE IF NOT EXISTS webappdb;

-- Use the newly created database
USE webappdb;

-- Create the transaction table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
