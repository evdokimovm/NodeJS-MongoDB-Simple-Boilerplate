var express = require('express');
var app = express();

var url = require('url');

var ejs = require('ejs');
app.set('view engine', 'ejs');

var cors = require('cors');
var api = require('./app/index.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var yourSchema = new Schema({
	request: String,
	time: Number
	// bool: Boolean
}, {
	collection: 'collectionName'
});

var Model = mongoose.model('Model', yourSchema);
mongoose.connect('mongodb://localhost:27017/dbName');

api(app, Model, cors, url);

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port);
});
