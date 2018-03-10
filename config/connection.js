'use strict';
var mysql = require("mysql2");

var connection;
var DB_PORT = 3306

// if JawsDB is specified in environment (endables heroku)
if(process.env.JAWSDB_URL) {
	// create connection to MySQL database on production server
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	// create connection for localhost
	connection = mysql.createConnection({
		host: "localhost",
		port: DB_PORT,
		user: "root",
		password: "",
		database: "ecomm"
	});
};

connection.connect(function(err) {
	if (err) {
		throw err;
		console.error(err)
	}
	console.log("----------------------------------------");
	console.log("Connected to project2 db (ecomm) on PORT: " + DB_PORT);
	console.log("----------------------------------------");
});

module.exports = connection;