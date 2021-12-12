# EE629
# SCHOOLS HOMEPAGE

## Introduction
Students who graduate from high school may want find their dream university. They may want know the inportant information about those schools like: address, race or gender diversity and ACT, SAT requirement.

Therefore, students usually need find those key words one by one on different website.

My project focus on those data and give students a convience plateform to reach those information.

## Getting started
### MongoDB
This project requires mongoDB, which you can download from: https://www.mongodb.com/try/download
### Installation
This project is separate into client-side, server-side and data-scrape three forders:
Step 1: You need go to data-scrape/data-scrape.py use `pip install` python packages, and run the scrape main function. The function will use 'unitid.csv' to reach those schools'url. This process of data scrape will cost 4~5 hours to collect 6800+ university infromation, do data clean and calculate some data. After that, function will save the data to 'school.csv'.
Step 2: You need `cd` into client-side and server-side do installation:  
    `npm install`
Step 3: Please go to server-side run seed.js.  This function will import the 'school.csv' to MongoDB. This process will ignore empty value.  The error output happen because some school have missing information. After seed.js successed, it will output: finshed. Please terminate the program at this time.

### Run
Like you did for installation, you need run both client-side and server-side with:
`npm start`,
The client-side will be on http://localhost:3000, the server-side will be on http://localhost:3008.

## Packages
### Data-Scrape
    pandas
    BeautifulSoup
    etree
    requests
    pymysql
    sqlalchemy
    numpy 
    tqdm
    time
    re
### client-side
    "@material-ui/core": "^4.11.3",
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.1.2",
    "mongodb": "^3.6.6",
    "react-router-dom": "^5.2.0",
    "antd": "^4.15.1",
    "axios": "^0.21.1"
### server-side
    "axios": "^0.21.1",
    "bluebird": "^3.7.2",
    "cors": "^2.8.5",
    "csv-parser": "^3.0.0",
    "express": "^4.17.1",
    "fs": "^0.0.1-security",
    "mongodb": "^3.3.0-beta2",
    "uuid": "^3.3.2"

