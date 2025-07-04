const {isAdmin} = require('../sessions')
const {readDB, writeDB} = require('../lib/fs');

const addcrime = (req, res, sendResponse, userID) => {
    let status_code, message, body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const crime = Number(JSON.parse(body).crime);
        if(isNaN(crime)) [status_code, message] = [400, 'request is malformed!'];
        else if(isAdmin(req)) {
            const db = readDB();
            const users = db.users;
            const user = users.find(user => user.id === userID);
            if(!user) [status_code, message] = [404, 'user not found!'];
            else {
                user.crime += crime;
                writeDB(db);
                [status_code, message] = [200, `user ${user.username} updated successfully!`];
            }
        } else [status_code, message] = [403, 'you have not required permission!'];
        sendResponse(res, status_code, {message});
    });
};

module.exports = addcrime;