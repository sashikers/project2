'use strict';

const models = require('../models/index');

module.exports = (app) => {

	//item 
	app.get('/item/', (req, res) => {
		res.render('item', {});
	});

	//item page
	app.get('/item/:id', (req, res) => {
		let id = req.params.id;
		models.Product.findOne({where:[{id}]}).then((product) => {
			var dataValues = product.dataValues;
			res.render('item', {dataValues});
		});
	});

	// checkout page
	app.get('/checkout', (req,res) => {
		res.render('checkout');
	});

	app.get('/success', (req, res) => {
		res.render('success');
	});

	//admin page
	app.get('/admin', (req,res) => {
		models.Category.findAll().then((categories)=>{
			res.status(200).render('editor', {categories});
		}).catch(()=>{
			res.sendStatus(500);
		});
	});

	//home page
	//IMPORTANT:this needs to be at the end
	app.get('/:categoty?', (req, res) => {
			res.render('index', {});
	});

};
