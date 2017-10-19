#!/usr/bin/python3
import pymongo
from pymongo import MongoClient
import facebook
import requests
import urllib3
import json
from bson.json_util import loads

client = MongoClient()
db = client.myTestDb

posts = db.mycol

#result = posts.insert_one(post_data)
#print(result.inserted_id)

token = 'EAAIawWZATGhsBAL6EZCbhEvAeUZAGpITigblKu2ZCIrZBFko1DfOQJTjRgVHSdzlXFNvij9DdS6fnORhge2FUpSAMhlfJSQ4wZAf5PbZCiOrZAkPMFqMiur5pZBPZAwcVYtVTRrJLWjp1cgn4FrgGMVQ165XF1S0Tupp0ZD'

search_words = ['bboy','b-boy', 'breakin battle', 'breaking battle', 'b-boy cypher', 'bboy cypher', 'break battle', 'freestyle session', 'battle cypher', 'cypher battle', 'smoke battle', 'circle battle', 'bgirl', 'b-girl', 'battle of the year', 'redbull bc one']

graph = facebook.GraphAPI(access_token=token, version = 2.10)


events_dict = open("events.txt", "w")

#events = graph.request('171399702921073/events/?past')

#events = graph.request('/search?q=cypher battle&type=event&limit=10000')
#result = posts.insert_many(events);

for i in search_words:
    events = graph.request('/search?q={}&type=event&limit=10000'.format(i))
    for j in range(len(events['data'])):
        try:
            if (events['data'][j]['place']['location']['state']) == 'CA':
                #print(json.dumps(events['data'][j], indent = 4))
                post_data = loads(json.dumps(events['data'][j]))
                #print(type(post_data))
                result = posts.insert_one(post_data)
                posts.ensureIndex({"name": 1, "nodes": 1}, {"unique": True, "dropDups": True}) 
                events_dict.write(json.dumps(events['data'][j], indent = 4))
                #print(json.dumps(events['data'][j], indent = 4))
        except KeyError:
            pass
    #print(json.dumps(events, indent = 4))
events_dict.close()
