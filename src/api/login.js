const {readDB} = require('../lib/fs');
const {addSession} = require('../sessions')

const login = (req, res, sendResponse) => {
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
            const users = readDB().users;
            const user = users.find(user => user.username === username && user.password === password);
            if(!user) sendResponse(res, 404, {
                message: 'user not found! (username or password is incorrect!)'
            });
            else {
                const sessionID = addSession(user);
                sendResponse(res, 200, {
                    message: 'user successfully loged in!',
                    authentication: sessionID
                });
            }
        }
    });
};

module.exports = login;