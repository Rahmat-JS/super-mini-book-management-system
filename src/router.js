const hello = require('./api/hello');
const register = require('./api/register');

const geturl = url => `/api/${url}`;

const sendResponse = (res, status_code, data) => {
    res.writeHead(status_code, {'content-type': 'application/json'});
    res.write(JSON.stringify(data));
    res.end();
};

const router = (req, res) => {
    const url = req.url;
    const method = req.method;
    let response;

    if(url === geturl('hello')) response = hello();
    else if(url === geturl('register') && method === 'POST') {
        register(req, res, sendResponse);
        return;
    }
    else response = {
        status_code: 404,
        data: {
            'message': 'api not found!',
            'url': url,
            'method': method
        }
    }
    sendResponse(res, response.status_code, response.data);
}

module.exports = router;