//model/dbschema.js
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. 
//this is the schema for data to be grabbed from MongoDb
var ResultSchema = new Schema({
	    description: String,
	    end_time: Date,
	    id: String,
	    name: String,
	    place: {
		id: String,
		location: {
		    latitude: Number,
		    longitude: Number,
		    street: String,
		    zip: String,
		},
		name: String
	    },
	    start_time: Date
	}, { collection: 'newTest'});
module.exports = mongoose.model('Results', ResultSchema);
