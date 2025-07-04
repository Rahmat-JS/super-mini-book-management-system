const readline = require('readline');
const {readDB, writeDB} = require('../lib/fs');

const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

(async () => {
    try {
        const db = readDB();
        const username = await askQuestion('Enter your username: ');

        if(db.users.some(user => user.username === username))
            throw new Error(`Error: someone exist by username ${username} in our database!`);

        const password = await askQuestion('Enter your password: ');
        db.users.push({
            id: crypto.randomUUID(),
            username: username,
            password: password,
            crime: 0,
            role: 'ADMIN',
            books: []
        });
        writeDB(db);
        console.log(`your superuser by username ${username} added to database successfully!`);
    } catch(err) {
        console.error(`an error occurred: ${err}`);
    } finally {
        rl.close();
    }
})();

