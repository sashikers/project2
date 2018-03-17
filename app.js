'use strict';
//app
const express = require('express');
const app = express();
const fs = require('fs');

//models
const models = require('./models/index');
const force = true;

models.sequelize.sync({force:force}).then(() =>{
	//seed data
	if(force){
		fs.readFile('./db/seed.js', function(err,beers){
			//filter out duplicate beers
		  var beers = JSON.parse(beers);
		  let unique_categories_array = [];
		  //SOURCE: https://stackoverflow.com/questions/43374112/filter-unique-values-from-an-array-of-objects
		  beers.filter(function(beer){
			  var is_unique_category = unique_categories_array.findIndex(cat => cat === beer.category);
			  if(is_unique_category <= -1){
			  	unique_categories_array.push(beer.category);
			  }
			  return null;
			});

		  let category_object_array = unique_categories_array.map(cat => { return {title:cat} });

			models.Category.bulkCreate(
				category_object_array
			).then(()=>{
				models.Product.bulkCreate(
					beers
				)
			});
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

//template context middleware
app.use((req,res,next)=>{
	//nav categoreis for nav bar
	models.Category.findAll().then((categories)=>{
		res.locals.categories = categories;
		next();
	});
});


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

