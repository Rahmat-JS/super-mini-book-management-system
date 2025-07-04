const {fs} = require('../lib/fs');

fs.writeFile('db.json', JSON.stringify({
    'users': [],
    'books': []
}, null, 2), err => {
    if(err) throw err;
    console.log('data base created successfully!');
});