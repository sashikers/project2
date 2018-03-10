'use strict';
const database = require('../config/connection');
const models = require('../models/index');

module.exports = (app) => {

	app.get('/api/product/list', (req,res) => {

		let query = `SELECT * FROM product ORDER BY createdAt DESC`;
		database.query(query,(err, rows) => {
			if(err) return res.status(404).json(err);
			res.status(200).json(rows);
		});

	});

	app.post('/admin/api/editor/', (req, res) => {

		console.log("Here is the req.body", req.body.id);

		let query = `INSERT INTO product SET ?`;
		database.query(query, [req.body], (err,rows) => {

			if(err){
				console.log('ERROR: ',err);
				return res.status(404).json(err);
			}
			return res.status(200).json(rows);
		});

	});

	app.put('/admin/api/editor/:id', (req, res) => {
		let id = req.params.id;
		console.log('Updating item! -- ', id);
		let query = `UPDATE product SET ? WHERE id = ?`;
		database.query(query, [req.body, id], (err,rows) => {
			if(err) return res.status(404).json(err);
			res.status(200).json(rows);
		});

	});

	app.get('/admin/api/product/:id', (req, res) => {
		let id = req.params.id;
		models.Product.findOne({where:[{id}]}).then((product) => {
			return res.status(200).json(product);
		});

	});


};