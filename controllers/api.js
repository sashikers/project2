// this function makes call to UnTappd API for beer meta data
var request = require('request');
var models = require('../models/index.js');
var fs = require('fs');

function apiCalls(category, max_beers) {
	console.log("API Calls Category", category);
	var clientId = "14BDEBB8D7A0FF082817C9C7DD17267ADC101A79";
	var clientSecret = "F31E34402AA7A1EB7F861309A29A6F45BC154550";
	// var clientId = "0733ADEE2A3B376BF45A72377382272449F9DDDC";
	// var clientSecret = "037283D5198177523FB45C241A769EE388FD9C14";
	//let brewery = "21st Amendment"
	//let specBeer = "Blah Blah Blah"
	//let beer = brewery + "+" + specBeer;

	// first api call returns beer id from beer search
	function beerid(category, max_beers) {
		var queryUrl = "https://api.untappd.com/v4/search/beer?client_id=" + clientId + "&client_secret=" + clientSecret + "&q=" + category + "&limit=3";

		console.log("beerid", category);

		request(queryUrl, function(error, response, body) {
			console.log("------------ NEW GET REQUEST ----------")
			let data = JSON.parse(body);
			// beer id
			console.log("******* DATA: ",data);
			// get all beer names returned from beer search
			var amount_to_add = max_beers || data.response.beers.items.length;
			for (i = 0; i < amount_to_add; i++) {
				var beerID = data.response.beers.items[i].beer.bid;
				beerInfo(beerID, category)
			}
		});
	}
	beerid(category, max_beers);

	// second API call for endpoint containing beer details
	function beerInfo(beerID, general_category) {
		console.log("BeerInfo Category", general_category);
		var queryUrl2 = "https://api.untappd.com/v4/beer/info/" + beerID + "?client_id=" + clientId + "&client_secret=" + clientSecret;

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
				untapped_id: beerID,
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

			console.log(newBeer);

			//just add the beer to the file, will check for duplicates and update file when loadgin seed.json
			const seed_file = '../db/seed.js'
			var beers_array = fs.readFileSync(seed_file);
			beers_array = JSON.parse(beers_array);
			beers_array.push(newBeer);
			fs.writeFileSync(seed_file,  JSON.stringify(beers_array));
			
			// determine if category/style exists in Category table. If not then create it
			// models.Category.findOrCreate({where: {title: category}})
			// .then((data) => {
			// 	console.log("DATA: ", data)
			// 	// create new product in product table using API data
			// 	models.Product.create({title, description, category, image_url})
			// })
		})
	}
}


function add_beers(category_array, max_beers){

	category_array.forEach((category) => {
		console.log("add_beers Category", category);
		apiCalls(category, max_beers);
	});
}

module.exports.add_beers = add_beers;

// apiCalls();