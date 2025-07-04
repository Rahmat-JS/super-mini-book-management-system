const {isAdmin} = require('../sessions')
const {readDB, writeDB} = require('../lib/fs');

const promote = (req, userID) => {
    let status_code, message;
    if(isAdmin(req)) {
        const db = readDB();
        const users = db.users;
        const user = users.find(user => user.id === userID);
        if(!user) [status_code, message] = [404, 'user not found!'];
        else if(user.role === 'ADMIN') [status_code, message] = [400, 'user is already an admin!'];
        else {
            user.role = 'ADMIN';
            writeDB(db);
            [status_code, message] = [200, `user ${user.username} promoted to admin successfully!`];
        }
    } else [status_code, message] = [403, 'you have not required permission!'];
    return {
        status_code: status_code,
        data: {
            message: message
        }
    }
};

module.exports = promote;