# Jam Search
## Description
#### Web App that let's you find B-boy events in a city!
(Code quality for this project is not optimized. Was used as a sandbox to learn MERN stack technologies. Would later like to redue this project with more modular components and improved data flow.)
This is a simple web app which allows the user to search b-boy/b-girl events in a specific city (Anywhere in the world!). Utilizes the Facebook Graph API to find events that are related breaking. Handles finding competitions, workshops, practice spots, and more. 


## Usage
Type in city to find events inside search bar. Click on event component for more info

![alt text](https://image.ibb.co/fZQ2vw/Screen_Shot_2017_11_07_at_1_11_18_AM.png)

![alt text](https://image.ibb.co/jdq7TG/Screen_Shot_2017_11_07_at_1_11_41_AM.png)

## Built with
* React.js
* Node.js
* Express
* MongoDB
* Python (for console)
* HTML
* CSS

## Details
All data is placed inside Mongo database. Search parameter is used with module known as auto fill. Auto fill returns a gps coordinate, and on click, the application itereates through all data and checks for events that are within a 50 mile radius of search parameter. Events will be displayed, and user may click on component to read more details of the event. Each component returns a map of where the event will be taking place. 


## Authors
Kevin Pak

