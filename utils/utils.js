// Allow us to read, write and delete files
const fs = require('fs');

// Gives access to the utility library
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        }else {
            const parseData = JSON.parse(data);
            parseData.push(content);
            fs.writeFile(file, parseData);
        }
    })
}

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
module.exports = {readFromFile, writeToFile, readAndAppend};