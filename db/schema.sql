
-- database

CREATE DATABASE ecomm;

USE ecomm;


-- tables

CREATE TABLE products (
	id INT AUTO_INCREMENT NOT NULL,
	product VARCHAR (100) NOT NULL,
	description VARCHAR (250),
	category VARCHAR (25),
	inventory INT NOT NULL,
	price decimal(11,2) NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users (
	userid INT AUTO_INCREMENT NOT NULL,
	username VARCHAR (100) NOT NULL,
	firstname VARCHAR (75),
	lastname VARCHAR (100),
	is_admin BOOLEAN NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (userid)
);

CREATE TABLE categories (
	id INT AUTO_INCREMENT NOT NULL,
	category VARCHAR (100) NOT NULL,
	count INT,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);


