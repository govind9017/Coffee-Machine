const fs = require("fs");
const path = require('path');

module.exports = {
  
  //Reads json file at the given path and returns a parsed output
  readFile (dirName, filename) {
    const filePath = path.join(dirName, filename);
    return JSON.parse(fs.readFileSync(filePath));
  }
}