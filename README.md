# Jam Search
## Description
#### Web App that let's you find B-boy events in a city!
(Code quality for this project is NOT optimized. Was used as a sandbox to learn MERN stack technologies. Would later like to redue this project with more modular components and improved data flow.)
This is a simple web app which allows the user to search b-boy/b-girl events in a specific city (Anywhere in the world!). Utilizes the Facebook Graph API to find events that are related breaking. Handles finding competitions, workshops, practice spots, and more. 

## Details
The application utilizes a python console to manage obtaining data through the Facebook Api. All events related to a keyword related to a breakdancing event will be stored into the Mongo database. 

The main application utilizes a location coordinate grabber known as 'Autofill'. The user inputs a location into the text field which will send a gps coordinate of the inputted location to a 'translator' method. This method takes the gps coordinate and finds all relevant data inside of the database which is within a 50 mile radius of inputted location.

Relevant data is then rendered to the view. 


## Usage
Type in city to find events inside search bar. Click on event component for more info

![alt text](https://image.ibb.co/fZQ2vw/Screen_Shot_2017_11_07_at_1_11_18_AM.png)

## Built with
* React.js
* Node.js
* Express
* MongoDB
* Python (for console)
* HTML
* CSS

## Authors
Kevin Pak

