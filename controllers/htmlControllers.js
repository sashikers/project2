'use strict';

const models = require('../models/index');

module.exports = (app) => {

	//home page
	app.get('/', (req, res) => {
		res.render('index', {testMessage:"hello world!"});
	});

	// checkout page 
	app.get('/checkout', (req, res) => {
		res.render('checkout');
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