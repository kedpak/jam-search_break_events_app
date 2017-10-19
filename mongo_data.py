#!/usr/bin/python3
import pymongo
from pymongo import MongoClient
import facebook
import requests
import urllib3
import json
from bson.json_util import loads
import pprint



client = MongoClient()
db = client.myTestDb

posts = db.mycol

result1 = posts.find({}, {"name":1, "_id": 0})
nameList = []
for name in result1:
    try:
        nameString = list(name.values())
        nameList.append(nameString[0])
    except IndexError:
        pass
print(nameList)
result2 = posts.find({}, {"description":1, "_id": 0})

for i in result2:
    myArray = list(i.values())
    try:
        if 'Bboy' in myArray[0]:
            print(i)
    except IndexError:
        pass
