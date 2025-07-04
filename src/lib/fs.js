const fs = require('fs');
const {DBPATH} = require('../config');

const readDB = () => {
    return JSON.parse(fs.readFileSync(DBPATH, 'utf8'));
};

const writeDB = data => {
    fs.writeFileSync(DBPATH, JSON.stringify(data, null, 2));
};

module.exports = {
    fs,
    readDB,
    writeDB
};
