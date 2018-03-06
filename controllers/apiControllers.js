'use strict';
const database = require('../config/connection');

module.exports = (app) => {

	app.post('/admin/api/editor/', (req, res) => {

		if(req.body.id){
			return res.status(404).json(err);
		}

		let query = `INSERT INTO product SET ?`;
		database.query(query, [req.body], (err,rows) => {
			if(err) return res.status(404).json(err);
			res.status(200).json(rows);
		});

	});

	app.put('/admin/api/editor/', (req, res) => {

		if(!req.body.id){
			return res.status(404).json();
		}
		let query = `UPDATE product SET ? WHERE id = ?`;
		database.query(query, [req.body], (err,rows) => {
			if(err) return res.status(404).json(err);
			res.status(200).json(rows);
		});

	});

};