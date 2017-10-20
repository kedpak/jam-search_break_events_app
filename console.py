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
            print('*********************************************')
            print('****You are working on the test database!****')
            print('*********************************************')
        elif arg == 'jam':
            self.db = self.clint.jamDb
            print(self.db)
            print('*********************************************')
            print('  ****You are working on Jam database!****   ')
            print('*********************************************')
        else:
            print("********Database not available**********")

    def do_collection(self, arg):
        """
        Selects collection to use
        """
        if arg == 'mycol':
            self.posts = self.db.mycol
            print("***********************************")
            print("**** Selected mycol collection ****")
            print("***********************************")
        else:
            print("****Collection not found****")

    def do_show(self, arg):
        """
        Prints ecords from collection
        Inputs:
        ----all: print all records in collection
        ----'int': prints number of records based on int argument passed
        ----
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

if __name__ == '__main__':
    """
    Command line loop
    """
    CommandLine().cmdloop()
