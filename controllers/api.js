// this function makes call to UnTappd API for beer meta data
var request = require('request');
var models = require('../models/index.js');
var fs = require('fs');


function apiCalls(category, max_beers) {
	console.log("API Calls Category", category);
	// var clientId = "14BDEBB8D7A0FF082817C9C7DD17267ADC101A79";
	// var clientSecret = "F31E34402AA7A1EB7F861309A29A6F45BC154550";
	var clientId = "0733ADEE2A3B376BF45A72377382272449F9DDDC";
	var clientSecret = "037283D5198177523FB45C241A769EE388FD9C14";

	// first api call returns beer id from beer search
	function beerid(category, max_beers) {
		var queryUrl = "https://api.untappd.com/v4/search/beer?client_id=" + clientId + "&client_secret=" + clientSecret + "&q=" + category + "&limit=3";

		console.log("beerid", category);

		request(queryUrl, function(error, response, body) {
			console.log("------------ NEW GET REQUEST ----------")
			let data = JSON.parse(body);
			// beer id
			// get all beer names returned from beer search
			if(error){console.log('****ERROR****', error);}
			console.log(data.response.beers);
			var amount_to_add = data.response.beers.items.length;
			console.log('********AMOUNT TO ADD******', amount_to_add);
			for (var i = 0; i < amount_to_add; i++) {
				var beerID = data.response.beers.items[i].beer.bid;
				if(beerID){
					console.log(beerID);
					beerInfo(beerID, category)
				}
			}
		});
	}
	beerid(category, max_beers);

	// second API call for endpoint containing beer details
	function beerInfo(beer_id, general_category) {
		console.log("BeerInfo Category", general_category);
		var queryUrl2 = "https://api.untappd.com/v4/beer/info/" + beer_id + "?client_id=" + clientId + "&client_secret=" + clientSecret;

		request(queryUrl2, function(error, response, body2) {
			let data2 = JSON.parse(body2);
			// beer name
			let title = data2.response.beer.beer_name;
			// beer description
			let description =  data2.response.beer.beer_description;
			// brewery
			let brewery = data2.response.beer.brewery.brewery_name;
			// beer label image
			let image_url = data2.response.beer.beer_label;
			// beer category/style
			//var category = category//data2.response.beer.beer_style;
			// beer alcohol percentage
			let abv = data2.response.beer.beer_abv + "% abv";
			// beer hops
			let ibu = data2.response.beer.beer_ibu + " ibu";

			let rating = data2.response.beer.rating_score;
			let ratingCount = data2.response.beer.rating_count;

			let newBeer = {
				untappd_id: beer_id,
				title: title,
				description: description,
				category: general_category,
				brewery: brewery,
				abv: abv,
				ibu: ibu,
				image_url: image_url,
				rating: rating,
				ratingCount: ratingCount
			}

			//just add the beer to the file, will check for duplicates and update file when loadgin seed.json
			const seed_file = '../db/seed.js'
			var beers_array = fs.readFileSync(seed_file);
			beers_array = JSON.parse(beers_array);
			beers_array.push(newBeer);
			fs.writeFileSync(seed_file,  JSON.stringify(beers_array));

			console.log('added beer', title);
			
			// determine if category/style exists in Category table. If not then create it
			// models.Category.findOrCreate({where: {title: category}})
			// .then((data) => {
			// 	console.log("DATA: ", data)
			// 	// create new product in product table using API data
			// 	models.Product.create({title, description, category, image_url})
			// })
		})
	}
};

function add_beers(category_array, max_beers){

	category_array.forEach((category) => {
		console.log("add_beers Category", category);
		apiCalls(category, max_beers);
	});
};

module.exports.add_beers = add_beers;

function filter_seed_beers(){
	fs.readFile('../db/seed.js', function(err,beers){
		var beers = JSON.parse(beers);
		console.log('Start Beer Count', beers.length);
		//filter out duplicate beers
	  let unique_beers_array = [];
	  //SOURCE: https://stackoverflow.com/questions/43374112/filter-unique-values-from-an-array-of-objects
	  beers.filter(function(beer){
		  var is_unique_beer = unique_beers_array.findIndex(x => x.untappd_id === beer.untappd_id);
		  console.log(beer.untapped_id, is_unique_beer);
		  if(is_unique_beer <= -1 || beer.untappd_id){
		  	beer.price = Math.floor(Math.random() * 12) + 5; //random price between 5 and 20
		  	beer.inventory = Math.floor(Math.random() * 167) + 22; //random inventory between 22 and 167
		    unique_beers_array.push(beer);
		  }
		});
	  fs.writeFile('../db/seed.js', JSON.stringify(unique_beers_array));
	  console.log('Start Beer Count', unique_beers_array.length);
	  console.log('Duplicates Removed: ', beers.length-unique_beers_array.length);
	});
};


module.exports.filter_seed_beers = filter_seed_beers;


