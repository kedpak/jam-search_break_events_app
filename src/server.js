/* server.js sets up API to get and post data to/from MongoDb */
'use strict'
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let app = express();
let router = express.Router();
let port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://127.0.0.1/firstdb');
let Result = require('./models/dbschema');

/* use bodyparser to check for JSON data in request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* Set headers to allow CORS */
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	res.setHeader('Cache-Control', 'no-cache');
	next();
    });
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
	res.json({ message: 'API Initialized! KKPAK'});
    });

/* Retrieve all events from Mongo Db */
router.route('/events')
    .get(function(req, res) {
	    /* Checks inside dbschema */
	    Result.find(function(err, events) {
		    if (err)
			res.send(events);
		    //responds with a json object of our database comments.
		    res.json(events)
			});
	})
/* Post new events to the database */

    .post(function(req, res) {
	    let event = new Result();
	    //body parser lets us use the req.body
	    event.description = req.body.description;
	    event.name = req.body.name;
	    event.id = req.body._id;
	    event.place = req.body.place;
	    event.location = req.body.place.location;
	    event.lat = req.body.place.location.latitude;
	    event.lng = req.body.place.location.longitude;
	    event.street = req.body.place.location.street;
	    event.zip = req.body.place.location.zip;
	    event.city = req.body.place.location.city;
	    event.country = req.body.place.location.country;
	    event.state = req.body.place.location.state;
	    event.startTime = req.body.start_time;
	    event.endTime = req.body.end_time;
	    event.save(function(err) {
		    if (err)
			res.send(err);
		    res.json({ message: 'Comment successfully added!' });
		});
});

app.use('/api', router);
app.listen(port, function() {
	console.log('api running on port ${port}');
    });