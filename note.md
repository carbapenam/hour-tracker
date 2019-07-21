- What's the embedding for Raleway font

Time Tracker

# Frontend
* Pick Color 
Main - #00154F (224,100,31)
Alt - #00299C or #2F4C9C
Login(Complementary) - #9C6F00

* Pick Font

Raleway -> Open Sans -> Helvetica -> Sans Serif

* Front Page
..* Timer
..* Focus/Stop Toggle
..* Hide time option

* Stats Page
..* Sum of Focused Time
..* List of times you've focused
..* Graph

* Responsive Design

* Login popup

# Database
* JSON structures for the data

# Node.JS/Express
* Serve static pages
* Develop API for the database

# Database 

* If the DB doesn't exist, then create a new one called "time_tracker"
* Create the collection and following would be the document format

{
date:
time_begin:
length: 
}

# API 

* How does it communicate with the Frontend
* Write the timing documentation to the database
* Read from the database with the date

POST type:
{
    type: read, write
    date_begin:
    date_end:
    time_begin:
    length:
}