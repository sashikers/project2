// this function makes call to UnTappd API for beer meta data
var request = require('request');


function apiCall() {
	var clientId = "0733ADEE2A3B376BF45A72377382272449F9DDDC";
	var clientSecret = "037283D5198177523FB45C241A769EE388FD9C14";
	let brewery = "21st Amendment"
	let specBeer = "Blah Blah Blah"
	let beer = brewery + "+" + specBeer;

	var queryUrl = "https://api.untappd.com/v4/search/beer?client_id=" + clientId + "&client_secret=" + clientSecret + "&q=" + beer;
	// var testQueryUrl = "https://api.untappd.com/v4/beer/info/" + beerId + "?client_id=" + clientId + "&client_secret=" + clientSecret;
	request(queryUrl, function(error, response, body) {
		// if (!error && response.statusCode === 200) {
		// }
		console.log("------------ NEW GET REQUEST ----------")

		var data = JSON.parse(body);
		// console.log(beer);
		// console.log(body);
		// console.log("BEER: ", data.response.beers.items[1].beer.beer_name);
		console.log("BEER: ", data.response.beers.items[0].beer.beer_name);
		console.log("DESCRIPTION: ", data.response.beers.items[0].beer.beer_description);
		console.log("BEER IMAGE: ", data.response.beers.items[0].beer.beer_label);
	})
}

apiCall();