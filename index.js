const fs = require("fs");
const path = require('path');
const Machine = require("./models/machine");

// Function to process machine to start preparing the beverages
const processMachine = async () => {
  const input = JSON.parse(fs.readFileSync(path.join(__dirname, process.argv[2])));
  const result = await new Machine(input).process();
  console.log(result);
};

processMachine();