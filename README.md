# Coffee machine 

### What is this service for? ###
Process machine (having multiple outlets) to get the beverage preparation status
It will take JSON input containing machine inventory, and beverage to prepare data and will return the beverage prepartion status along with reason 

### Data source ###
  Data is static and is taken from inputData.json file containing data in the JSON format 
  For test cases, data is being fetched from the testData files

### How do I get set up? ###
Summary of set up:
1. Install node and npm and verify installation by running below commands in shell
    ```PowerShell
    node -v
    npm -v
    ```
2. Install required dependencies using npm:
    * Run command **npm install** in terminal to install dependencies
    * Dependencies required: jest library

* Database configuration: Not required


### How to run tests: ###
  Dependency: Jest library (Installation Command: npm install jest)
  
  Run tests from the below command
  ```PowerShell
  npm test
  ```
