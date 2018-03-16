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
		  let unique_beers_array = [];
		  let unique_categories_array = [];
		  //SOURCE: https://stackoverflow.com/questions/43374112/filter-unique-values-from-an-array-of-objects
		  beers.filter(function(beer){
			  var is_unique_beer = unique_beers_array.findIndex(x => x.untappd_id === beer.untappd_id);
			  if(is_unique_beer <= -1){
			  	var random_price = Math.floor(Math.random() * 12) + 5; //random price between 5 and 20
			  	var random_inventory = Math.floor(Math.random() * 167) + 22; //random inventory between 22 and 167
			  	beer.price = random_price;
			  	beer.inventory = random_inventory;
			    unique_beers_array.push(beer);
			  }

			  var is_unique_category = unique_categories_array.findIndex(cat => cat === beer.category);
			  if(is_unique_category <= -1){
			  	unique_categories_array.push(beer.category);
			  }
			  return null;
			});

		  fs.writeFile('./db/seed.js', JSON.stringify(unique_beers_array));

		  let category_object_array = unique_categories_array.map(cat => { return {title:cat} });

			models.Category.bulkCreate(
				category_object_array
			).then(()=>{
				models.Product.bulkCreate(
					unique_beers_array
					// {title:'Test Beer', description:'This is good beer', category:'lager', price:12, inventory: 20, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
					// {title:'More Beer', description:'This is good beer', category:'stout', price:14, inventory: 10, },
					// {title:'Beer Good', description:'This is good beer', category:'stout', price:20, inventory: 300, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
					// {title:'I like Beer', description:'This is good beer', category:'ipa', price:12, inventory: 40, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
					// {title:'Beer Beer', description:'This is good beer', category:'lager', price:8, inventory: 66, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
					// {title:'Another Beer', description:'This is good beer', category:'ipa', price:9, inventory: 17, image_url:'https://502brews.files.wordpress.com/2013/05/draft-beer-small.jpg'},
				);
			});

		})
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

