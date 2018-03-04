


-- users table seed

INSERT INTO users (username, firstname, lastname, is_admin)
VALUES ("awesomeguy18", "bob", "patterson", false);

INSERT INTO users (username, firstname, lastname, is_admin)
VALUES ("keiera87", "keiera", "chatman", false);

INSERT INTO users (username, firstname, lastname, is_admin)
VALUES ("2friendlyfreddy", "fred", "flinstone", false);


-- Products table seeds

INSERT INTO products (product, description, category, inventory, price)
VALUES ("settlers of catan", "multiplayer resource based board game rated 3rd best board game of all time by ravereivews.org", "games", 10, 85.99);

INSERT INTO products (product, description, category, inventory, price)
VALUES ("Specialized Rockhopper Commuter Bicycle", "Hybrid bike with big wheels, svelte A1-aluminum frame and a Manitou M30 suspension fork and 21 gears", "bikes", 2, 1085.99);

INSERT INTO products (product, description, category, inventory, price)
VALUES ("MacBook Pro 13in", "Last years (2017) model. 2.3 GHz Intel Core i5 processor, 8GB, 1TB HD.", "electronics", 5, 2199.99);


-- categories table seeds

INSERT INTO categories (category, count)
VALUES ("games", 1);

INSERT INTO categories (category, count)
VALUES ("bikes", 1);

INSERT INTO categories (category, count)
VALUES ("electronics", 1);

