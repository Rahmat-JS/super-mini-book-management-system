let sessions = {};

const getSessionID = req => {
    return req.headers['authentication'];
};

const getUsername = req => {
    const sessionID = getSessionID(req);
    if(!sessionID) return false;
    return sessions[sessionID].username;
}

const addSession = user => {
    const sessionID = crypto.randomUUID();
    sessions[sessionID] = {
        username: user.username,
        role: user.role
    }
    return sessionID;
};

const rmSession = req => {
    const sessionID = getSessionID(req);
    if(sessions[sessionID] === undefined) return false;
    delete sessions[sessionID];
    return true;
}

const isAuthenticated = req => {
    const sessionID = getSessionID(req);
    return sessions[sessionID] || false;
};

const isAdmin = req => {
    const sessionID = getSessionID(req);
    return sessions[sessionID] && sessions[sessionID].role === 'ADMIN';
};

module.exports = {
    addSession,
    rmSession,
    isAuthenticated,
    isAdmin,
    getUsername
};