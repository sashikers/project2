'use strict';
module.exports = (app) => {

	//sample/test call
	app.post('/api/test', (req, res) => {
		res.status(200).json("hello world");
	});

};