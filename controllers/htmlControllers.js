'use strict';

const models = require('../models/index');

module.exports = (app) => {

	//home page
	app.get('/', (req, res) => {
		res.render('index', {testMessage:"hello world!"});
	});

	//item page
	app.get('/item', (req, res) => {
		res.render('item', {testMessage:"hello world!"});
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

};
