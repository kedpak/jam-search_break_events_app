#!/usr/bin/node

var EventSearch = require("facebook-events-by-location-core");

var es = new EventSearch();
var fs = require('fs');


let search_words = ['bboy','b-boy', 'krow', 'breakin battle', 'breaking battle', 'b-boy cypher', 'bboy cypher', 'break battle']

es.search({
  "lat": 33.743718,
  "lng": -117.000253,
  "distance": 1000
}).then(function (events) {
    
    let eventList = JSON.stringify(events, null, 4);
    fs.writeFile("node.txt", eventList, function(err) {
    if(err) {
        return console.log(err);
    }
    
    }); 

    console.log(eventList);
    for (let i = 0; i < events.events.length; i++) {
	for (let j = 0; j < search_words.length; j++) {
	    if (hip.indexOf("BBOY") > -1){
		console.log(events.events[i]);
	    }
	}
    }
console.log(events);

}).catch(function (error) {
    console.error(JSON.stringify(error));
});
