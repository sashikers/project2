'use strict';
module.exports = (app) => {

	//home page
	app.get('/', (req, res) => {
		res.render('index', {testMessage:"hello world!"});
	});

	//admin page
	app.get('/admin', (req,res) => {
		res.render('editor', { layout: 'admin.handlebars',
											testMessage:'Admin Page!'
										});
	})

};