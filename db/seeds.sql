
-- users table seed

INSERT INTO user (email, password, firstname, lastname, is_admin)
VALUES ("awesomeguy18@gmail.com", "password", "bob", "patterson", true);

INSERT INTO user (email, password, firstname, lastname, is_admin)
VALUES ("keiera87@gmail.com", "password", "keiera", "chatman", false);

INSERT INTO user (email, password, firstname, lastname, is_admin)
VALUES ("2friendlyfreddy@gmail.com", "password", "fred", "flinstone", false);


-- Products table seeds

INSERT INTO product (title, description, categoryID, inventory, price)
VALUES ("Blah Blah Blah","deep gold color, double IPA (of course) and jammed packed with hop flavors and aromas. With nine different hop varietals, on top of late-kettle boil additions, this beer has a juicy, hop chewy flavor.", 1, 100, 12.99);

INSERT INTO product (title, description, categoryID, inventory, price)
VALUES ("Pabst Blue Ribbon", "The Original Pabst Blue Ribbon. Nature's choicest products provide its prized flavor. Only the finest of hops and grains are used. Selected as America's Best in 1893.", 2, 255, 5.99);

INSERT INTO product (title, description, categoryID, inventory, price)
VALUES ("MacBook Pro 13in", "Dark & delicious, America’s milk stout will change your perception about what a stout can be. Pouring hard out of the bottle, Milk Stout Nitro cascades beautifully, building a tight, thick head like hard whipped cream. The aroma is of brown sugar and vanilla cream, with hints of roasted coffee. The pillowy head coats your upper lip and its creaminess entices your palate. Initial roasty, mocha flavors rise up, with slight hop & roast bitterness in the finish. The rest is pure bless of milk chocolate fullness.", 3, 54, 10.99);


-- categories table seeds

INSERT INTO category (title)
VALUES ("ipa");

INSERT INTO category (title)
VALUES ("lager");

INSERT INTO category (title)
VALUES ("stout");

