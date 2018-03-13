// this function makes call to UnTappd API for beer meta data
var request = require('request');
var models = require('../models/index.js');

function apiCalls() {
	var clientId = "0733ADEE2A3B376BF45A72377382272449F9DDDC";
	var clientSecret = "037283D5198177523FB45C241A769EE388FD9C14";
	let brewery = "21st Amendment"
	let specBeer = "Blah Blah Blah"
	let beer = brewery + "+" + specBeer;

	// first api call returns beer id from beer search
	function beerid() {
		var queryUrl = "https://api.untappd.com/v4/search/beer?client_id=" + clientId + "&client_secret=" + clientSecret + "&q=" + beer;

		request(queryUrl, function(error, response, body) {
			console.log("------------ NEW GET REQUEST ----------")
			let data = JSON.parse(body);
			// beer id
			let beerID = data.response.beers.items[0].beer.bid;
			// get all beer names returned from beer search
			// for (i = 0; i < data.response.beers.items.length; i++) {
			// 	console.log(data.response.beers.items[i].beer.beer_name);
			// }
	
			beerInfo(beerID);
		});
	}
	beerid();

	// second API call for endpoint containing beer details
	function beerInfo(beerID) {
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
			let category = data2.response.beer.beer_style;
			// beer alcohol percentage
			let abv = data2.response.beer.beer_abv + "% abv";
			// beer hops
			let ibu = data2.response.beer.beer_ibu + " ibu";

			let rating = data2.response.beer.rating_score;
			let ratingCount = data2.response.beer.rating_count;

			let newBeer = {
				beer: title,
				type: category,
				brewery: brewery,
				desc: description,
				alcohol: abv,
				hops: ibu,
				photo: image_url,
				rating: rating,
				ratingCount: ratingCount
			}
			console.log(newBeer);
			// addToDb(newBeer);

			// determine if category/style exists in Category table. If not then create it
			models.Category.findOrCreate({where: [{title: category}]})
			.then((data) => {
				console.log("DATA: ", data)
				// create new product in product table using API data
				models.Product.create({title, description, category, image_url})
			})
		})
	}
}

apiCalls();