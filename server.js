var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var moment = require('moment');
var PORT = process.env.PORT || 3000;
var db = require('./db');
var id = 11; // db.length === 10
var itemProps = ['id', 'substrate', 'type', 'manufacturer', 'format', 'size', 'wholesaleCost', 'retailPrice', 'stock'];
var itemPropsNoId = ['substrate', 'type', 'manufacturer', 'format', 'size', 'wholesaleCost', 'retailPrice', 'stock'];

function reqTimestamp(req, res, next) {
  console.log(`> [${moment().format('HH:mm:ss.SSS')}] ${req.method} ${req.url}`);
  next();
}

app.use(bodyParser.json());
app.use(reqTimestamp);
app.use(express.static(__dirname + '/public'));
app.use('/libs', express.static(__dirname + '/bower_components'));

// @GET all todos
app.get('/items', function (req, res) {
  res.json(db);
});

// @GET by :id
app.get('/items/:id', function (req, res) {
  let item = _.find(db, {id:Number(req.params.id)});
  res.json(item);
});

// @POST
app.post('/items', function (req, res) {
  let body = _.pick(req.body, itemPropsNoId);

	body.id = id++;
  db.push(body);
  res.json(body);
});

// @PUT by :id
app.put('/items/:id', function (req, res) {
  let body = _.pick(req.body, itemProps);
  let validAttrs = {};
  let itemId = Number(req.params.id);
  let matchedItem = _.find(db, {id: itemId});

  if (!matchedItem) {
    return res.status(404).send();
  }

  _.assignIn(matchedItem, body);
  res.json(matchedItem);
});

// @DELETE todo by :id
app.delete('/items/:id', function (req, res) {
	let matchedItem = _.find(db, {id: Number(req.params.id)});

	if (matchedItem) {
		db = _.pull(db, matchedItem);
		res.json(matchedItem);
	} else {
		res.status(404).send();
	}
});

app.listen(PORT, function () {
  console.log(`> [${moment().format('HH:mm:ss.SSS')}]: Server started on Port ${PORT}`);
});
