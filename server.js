var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var PORT = process.env.PORT || 3000;

function reqTimestamp(req, res, next) {
  console.log(`Method: ${req.method} @${new Date()}`);
  // console.log(`Req.body: ${req.body}`);
  next();
}

var tmpDB = [];
var id = 0;

app.use(bodyParser.json());
app.use(reqTimestamp);
app.use(express.static(__dirname + '/public'));
app.use('/libs', express.static(__dirname + '/bower_components'));

// @GET all todos
app.get('/things', function (req, res) {
  res.json(tmpDB);
});

// @GET by :id
app.get('/things/:id', function (req, res) {
  var thing = _.find(tmpDB, {id:Number(req.params.id)});
  res.json(thing);
});

// @POST
app.post('/things', function (req, res) {
  var body = _.pick(req.body, ['prop1', 'prop2']);

  if (body.props !== validDataType) {
		return res.status(400).send();
	}

	body.id = id++;
  tmpDB.push(body);
  res.json(body);
});

// @PUT by :id
app.put('/things/:id', function (req, res) {
  var body = _.pick(req.body, ['prop1', 'prop2']);
  var validAttrs = {};
  var thingId = Number(req.params.id);
  var matchedThing = _.find(tmpDB, {id: thingId});

  if (!matchedThing) {
    return res.status(404).send();
  }

  if (body.hasOwnProperty(prop) && body.prop === validDataType) {
    validAttrs.prop = body.prop;
  } else if (body.hasOwnProperty(prop)) {
    return res.status(400).send();
  }

  _.assignIn(matchedThing, validAttrs);
  res.json(matchedThing);
});

// @DELETE todo by :id
app.delete('/things/:id', function (req, res) {
	var thingId = Number(req.params.id);
	var matchedThing = _.find(tmpDB, {id: thingId});

	if (matchedThing) {
		tmpDB = _.pull(tmpDB, matchedThing);
		res.json(matchedThing);
	} else {
		res.status(404).send();
	}
});

app.listen(PORT, function () {
  console.log(`> Server started on Port: ${PORT} @${new Date()}`);
});
