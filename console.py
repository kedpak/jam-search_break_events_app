#!/usr/bin/python3
"""
Command interpreter to easily manage data between FB API and
data to be stored in Mongo database.
"""
import pymongo
from pymongo import MongoClient
import facebook
import requests
import urllib3
import json
from bson.json_util import loads
from search_words import search_words
from search_words import desc_words
import cmd
import pprint
from fb_token import token
from fb_token import graph

class CommandLine(cmd.Cmd):
    """
    Command line class for console
    """
    prompt = '(JamSearch)$ '
    client = MongoClient()
    db = ''
    posts = ''

    def preloop(self):
        """
        Introduction to Command Line interperter
        """
        print('.*******************************.')
        print('|   This is Jam Search CLI!!!!  |')
        print('|  Manage all FB data here!!!!  |')
        print('|     For help type \'help\'    |')
        print('|  To quit simply type \'quit\' |')
        print('|                               |')
        print('|     Enjoy and have fun! :D    |')
        print('.*******************************.')

    def postloop(self):
        """
        Exit Command Line Interpreter
        """
        print('..*******************************..')
        print('||          Peace Out!!          ||')
        print('||     <("<)   <(")>   (>")>     ||')
        print('..*******************************..')

    def default(self, line):
        """
        Default if command is unrecognzed
        """
        print("\"{}\" is an unknown command".format(line))

    def emptyline(self):
        """
        Handle empty line input
        """
        pass
    
    def do_quit(self, line):
        """
        Command exits the program
        """
        return True

    def do_EOF(self, line):
        """
        Handles End of File
        """
        print()
        return True
        
    def do_use(self, arg):
        """
        Selects database to use
        input 'test' which selects test database
        input 'true' which  selects true database
        """
        if arg == 'test':
            self.db = self.client.myTestDb
            print(self.db)
            print('                                             ')
            print('*********************************************')
            print('****You are working on the test database!****')
            print('*********************************************')
            print('                                             ')

        elif arg == 'jam':
            self.db = self.clint.jamDb
            print(self.db)
            print('                                             ')
            print('*********************************************')
            print('  ****You are working on Jam database!****   ')
            print('*********************************************')
            print('                                             ')
        else:
            print("********Database not available**********")

    def do_collection(self, arg):
        """
        Selects collection to use
        """
        if arg == 'mycol':
            self.posts = self.db.mycol
            print('                                   ')
            print("***********************************")
            print("**** Selected mycol collection ****")
            print("***********************************")
            print('                                   ')
        else:
            print("****Collection not found****")

    def do_show(self, arg):
        """
        Prints ecords from collection
        Inputs:
        ----all: print all records in collection
        ----'int': prints number of records based on int argument passed
        ----arg: prints name of arg input if exists
        """
        print_events = self.posts.find()
        if arg == 'all':
            for events in print_events:
                pprint.pprint(events)
        elif arg.isdigit():
            for i in range(int(arg)):
                pprint.pprint(print_events[i])
        else:
            for events in print_events:
                try:
                    if arg in events['name'].lower():
                        pprint.pprint(events)
                except:
                    pass

    def do_insert(self, arg):
        """
        Inserts data from FB API into Mongo Db.
        Records with duplicate names are filtered
        """

        # This loop iterates through records to place name into list.
        # Used to filter duplicates.
        name_list = []
        event_names = self.posts.find({}, {"name":1, "_id": 0})
        for name in event_names:
            try:
                nameString = list(name.values())
                name_list.append(nameString[0])
            except IndexError:
                pass

        for i in search_words:
            events = graph.request('/search?q={}&type=event&limit=10000'.format(i))
            for j in range(len(events['data'])):
                try:
                    if (events['data'][j]['place']['location']['city']) == 'Austin':
                        if (events['data'][j]['name'] not in event_names):
                            post_data = loads(json.dumps(events['data'][j]))
                            result = self.posts.insert_one(post_data)
                except KeyError:
                    pass

    def do_length(self, arg):
        """
        Prints length of records inside Db
        """
        event_list = self.posts.find()
        count = 0
        for events in event_list:
            count += 1
        print(count)

    def do_clean(self, arg):
        """
        Removes records that are not relevant from collection
        """
        words = desc_words
        result = self.posts.find({}, {"description":1, "_id": 0})

        for i in result:
            myArray = list(i.values())
            try:
                for j in range(len(words)):
                    if words[j] in myArray[0].lower():
                        break
                    if j == len(words) - 1:
                        print("**** Irrelevant records have been deleted****")
                        self.posts.delete_many(i)
            except IndexError:
                pass

    def do_group(self, arg):
        """
        Inserts record events that have been posted in
        specific group page from FB API
        """
        group_events = graph.request('{}/events'.format(arg))
        try:
            for events in group_events['data']:
                event_data = loads(json.dumps(events))
                result = self.posts.insert_one(event_data)
                print("**** Events from {} group page have been added! ****". format(arg))
        except:
            print("**** No souch group ID exists! ****")


if __name__ == '__main__':
    """
    Command line loop
    """
    CommandLine().cmdloop()
