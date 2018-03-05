'use strict';
//setup App
const express = require('express');
const app = express();

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

