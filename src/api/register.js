const register = (req, res, sendResponse) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        body = JSON.parse(body);
        sendResponse(res, 200, {
            'message': `${body.username} added successfully!`,
            'user': body
        });
    });
};

module.exports = register;