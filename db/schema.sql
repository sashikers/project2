
-- database

CREATE DATABASE ecomm;

USE ecomm;


-- tables

CREATE TABLE product (
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR (100) NOT NULL,
	description VARCHAR (2000),
	categoryID INT (11) NOT NULL,
	inventory INT NOT NULL,
	price decimal(11,2) NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE user (
	id INT AUTO_INCREMENT NOT NULL,
	email VARCHAR (100) NOT NULL,
	firstname VARCHAR (75),
	lastname VARCHAR (100),
	is_admin BOOLEAN NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE category (
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR (100) NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);





