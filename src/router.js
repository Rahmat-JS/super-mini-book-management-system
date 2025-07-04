const hello = require('./api/hello');
const register = require('./api/register');
const login = require('./api/login');
const logout = require('./api/logout');
const promote = require('./api/promote');
const addcrime = require('./api/addcrime');
const {addBook, rmBook, updateBook, getBook, getAllBooks, reserveBook, releaseBook} = require('./api/books')

const geturl = url => `/api/${url}`;
const get404 = (url, method) => {
    return {
        status_code: 404,
        data: {
            message: 'api not found!',
            url: url,
            method: method
        }
    }
};

const sendResponse = (res, status_code, data) => {
    res.writeHead(status_code, {'content-type': 'application/json'});
    res.write(JSON.stringify(data));
    res.end();
};

const router = (req, res) => {
    const url = req.url;
    const parsed_url = url.slice(1).split('/');
    const method = req.method;
    let response;

    if(url === geturl('hello')) response = hello();
    else if(url === geturl('register') && method === 'POST') return register(req, res, sendResponse);
    else if(url === geturl('login') && method === 'POST') return login(req, res, sendResponse);
    else if(url === geturl('logout') && method === 'POST') response = logout(req);
    else if(`/${parsed_url[0]}/${parsed_url[1]}` === geturl('users')) {
        if(parsed_url[3] === 'promote' && method === 'PUT') response = promote(req, parsed_url[2]);
        else if(parsed_url[3] === 'addcrime' && method === 'PUT') return addcrime(req, res, sendResponse, parsed_url[2]);
        else response = get404(url, method);
    } else if(`/${parsed_url[0]}/${parsed_url[1]}` === geturl('books')) {
        if(parsed_url[3] && method === 'PUT') {
            if(parsed_url[3] === 'release') response = releaseBook(req, parsed_url[2]);
            else if(parsed_url[3] === 'reserve') response = reserveBook(req, parsed_url[2]);
            else response = get404(url, method);
        }
        else if(method === 'GET' && parsed_url[2]) response = getBook(req, parsed_url[2]);
        else if(method === 'GET') response = getAllBooks(req);
        else if(method === 'PUT') return updateBook(req, res, sendResponse, parsed_url[2]);
        else if(method === 'DELETE') response = rmBook(req, parsed_url[2]);
        else if(method === 'POST') return addBook(req, res, sendResponse);
        else response = get404(url, method);
    } else response = get404(url, method);
    sendResponse(res, response.status_code, response.data);
}

module.exports = router;