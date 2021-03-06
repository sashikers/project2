
--/** NOTE: SEE models/ file for sequelize model schema, may differ from below

-- database

CREATE DATABASE ecomm;

USE ecomm;


-- tables

CREATE TABLE category (
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR (100) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE product (
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR (100) NOT NULL,
	description VARCHAR (2000),
	category_id INT (11) NOT NULL DEFAULT 1,
	inventory INT NOT NULL DEFAULT 0,
	price decimal(11,2) NOT NULL DEFAULT 0,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY(category_id)
		REFERENCES category(id)
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







