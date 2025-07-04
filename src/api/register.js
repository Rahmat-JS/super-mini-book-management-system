const {readDB, writeDB} = require('../lib/fs');

const register = (req, res, sendResponse) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const {username, password} = JSON.parse(body);
        if(!username || !password)
            sendResponse(res, 400, {
                message: 'your input is invalid!'
            });
        else {
            const db = readDB();
            if(db.users.some(user => user.username === username))
                sendResponse(res, 409, {
                    message: `username ${username} exist before!`
                });
            else {
                const new_user = {
                    id: crypto.randomUUID(),
                    username: username,
                    password: password,
                    crime: 0,
                    role: 'USER',
                    books: [] // zero books reseved first
                };
                db.users.push(new_user);
                writeDB(db);
                new_user.password = '****'
                sendResponse(res, 201, {
                    'message': `${username} added successfully!`,
                    'user': new_user
                });
            }
        }
    });
};

module.exports = register;