'use strict';
const database = require('../config/connection');
const models = require('../models/index');

module.exports = (app) => {

	//get all products
	app.get('/api/product/list', (req,res) => {
		let query = `SELECT * FROM product ORDER BY createdAt ASC`;
		database.query(query,(err, rows) => {
			if(err) return res.status(404).json(err);
			res.status(200).json(rows);
		});

	});

	//create product
	app.post('/admin/api/editor/', (req, res) => {

		let query = `INSERT INTO product SET ?`;
		database.query(query, [req.body], (err,rows) => {

			if(err){
				console.log('ERROR: ',err);
				return res.status(404).json(err);
			}
			return res.status(200).json(rows);
		});

	});

	//update product
	app.put('/admin/api/editor/:id', (req, res) => {
		let id = req.params.id;
		let query = `UPDATE product SET ? WHERE id = ?`;
		database.query(query, [req.body, id], (err,rows) => {
			if(err) return res.status(404).json(err);
			res.status(200).json(rows);
		});
	});

	//delete product
	app.delete('/admin/api/editor/:id', (req, res) => {
		let id = req.params.id;
		models.Product.destroy({where:[{id}]}).then((affectedRows) => {
			if(affectedRows === 0) res.sendStatus(404);
			res.sendStatus(200);
		}).catch((err) => {
			res.status(404).json(err);
		})
	});

	//get product
	app.get('/admin/api/product/:id', (req, res) => {
		let id = req.params.id;
		models.Product.findOne({where:[{id}]}).then((product) => {
			return res.status(200).json(product);
		});

	});


};