'use strict';
//app
const express = require('express');
const app = express();

//models
const models = require('./models/index');
const force = true;
models.sequelize.sync({force:force}).then(() =>{
	//seed data
	if(force){
		models.Category.bulkCreate([
			{title: 'ipa'},
			{title: 'lager'},
			{title: 'stout'}
		]).then(()=>{
			models.Product.bulkCreate([
				{title:'Test Beer', description:'This is good beer', category:'lager', price:12, inventory: 20, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
				{title:'More Beer', description:'This is good beer', category:'stout', price:14, inventory: 10, },
				{title:'Beer Good', description:'This is good beer', category:'stout', price:20, inventory: 300, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
				{title:'I like Beer', description:'This is good beer', category:'ipa', price:12, inventory: 40, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
				{title:'Beer Beer', description:'This is good beer', category:'lager', price:8, inventory: 66, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
				{title:'Another Beer', description:'This is good beer', category:'ipa', price:9, inventory: 17, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
			]);
		});
	}
});

//middleware
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, "/public/assets")));
app.use('/vendor', express.static(path.join(__dirname, '/node_modules')));

//handlebars
var exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({
		defaultLayout: "main",
		helpers: {
        section: function(name, options){ 
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this); 
            return null;
        } 
    },   
}));
app.set("view engine", "handlebars");

//setup routes/controllers
const api_routes = require('./controllers/apiControllers');
const html_routes = require('./controllers/htmlControllers');
api_routes(app);
html_routes(app);

module.exports = app;

