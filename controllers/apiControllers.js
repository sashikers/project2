'use strict';
const database = require('../config/connection');
const models = require('../models/index');

module.exports = (app) => {

	//get all products
	app.get('/api/product/list', (req,res) => {
		models.Product.findAll({order:[['createdAt','DESC']]}).then((products)=>{
			res.status(200).json(products);
		}).catch((err)=>{
			console.log('ERROR: ',err);
			res.status(404).json(err);
		});
	});

	//create product
	app.post('/admin/api/editor/', (req, res) => {
		models.Product.create(req.body).then((product) => {
			res.sendStatus(200);
		}).catch((err) => { 
			console.log('ERROR: ',err);
			res.status(404).json(err);
		})
	});

	//update product
	app.put('/admin/api/editor/:id', (req, res) => {
		let id = req.params.id;
		models.Product.update(req.body, {where:[{id}]}).then((product)=>{
			res.status(200).json(product);
		}).catch((err)=>{
			console.log('ERROR: ',err);
			res.status(404).json(err);
		});
	});

	//delete product
	app.delete('/admin/api/editor/:id', (req, res) => {
		let id = req.params.id;
		models.Product.destroy({where:[{id}]}).then((affectedRows) => {
			if(affectedRows === 0) res.sendStatus(404);
			res.sendStatus(200);
		}).catch((err) => {
			console.log('ERROR: ',err);
			res.status(404).json(err);
		});
	});

	//get product
	app.get('/admin/api/product/:id', (req, res) => {
		let id = req.params.id;
		models.Product.findOne({where:[{id}]}).then((product) => {
			return res.status(200).json(product);
		}).catch((err) => {
			console.log('ERROR: ',err);
			res.status(404).json(err);
		});
	});
};