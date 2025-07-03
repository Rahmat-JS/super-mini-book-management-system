const fs = require('fs');
const readline = require('readline');

const DB = 'db.json';

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
        const data = JSON.parse(fs.readFileSync(DB));
        const username = await askQuestion('Enter your username: ');

        if(data.users.some(user => user.username === username))
            throw new Error(`Error: someone exist by username ${username} in our database!`);

        const password = await askQuestion('Enter your password: ');
        data.users.push({
            'id': crypto.randomUUID(),
            'username': username,
            'password': password,
            'crime': 0,
            'role': 'ADMIN'
        });
        fs.writeFileSync(DB, JSON.stringify(data, null, 2));
        console.log(`your superuser by username ${username} added to database successfully!`);
    } catch(err) {
        console.error(`an error occurred: ${err}`);
    } finally {
        rl.close();
    }
})();

