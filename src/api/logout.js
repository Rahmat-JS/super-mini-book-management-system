const {isAuthenticated, rmSession} = require('../sessions')

const logout = req => {
    if(isAuthenticated(req)) {
        rmSession(req);
        return {
            status_code: 200,
            data: {
                message: 'user logged out successfully!'
            }
        };
    } else return {
        status_code: 404,
        data: {
            message: 'user log out process faild!'
        }
    }
};

module.exports = logout;