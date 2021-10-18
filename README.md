# Museum Attendence Summary

### What is this service for? ###
Server to fetch museum attendance summary for a particular month
It will have museum and visitors count information for each month

### Data source ###
Museum Visitors data is being fetched from Data lacity website. Click [here](https://data.lacity.org/Arts-Culture/Museum-Visitors/trxm-jn3c) to view data


### How do I get set up? ###
Summary of set up:
1. Install node and npm and verify installation by running below commands in shell
    ```PowerShell
    node -v
    npm -v
    ```
2. Install required dependencies using npm:
    * Run command **npm install** in terminal to install dependencies
    * Dependencies required: express, axios, jest, moment library

* Database configuration: Not required


### Start your Server ###
Start your server with the node command followed by the name of the JavaScript file.
  ```PowerShell
  node server.js
  ```


### How to run tests: ###
  Dependency: Jest library (Installation Command: npm install jest)
  
  Run tests from the below command
  ```PowerShell
  npm test
  ```


### APIs ###
- Api to fetch museum attendence summary for a particular month

  **GET**: http://localhost:3000/api/visitors

  **Query params:** { date (in milliseconds) ,ignore (museum to ignore (Optional))}

  **Returns:** museum attendence details object containg:
  - The month of the search
  - The year of the search
  - The total visitors for the month, not counting the ignored museum
  - The museum with the highest number of visitors, not counting the ignored museum
  - The museum with the lowest number of visitors, not counting the ignored museum
  - The ignored museum# Museum-Visitors
