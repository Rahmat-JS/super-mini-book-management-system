const {isAdmin, isAuthenticated, getUsername} = require('../sessions');
const {readDB, writeDB} = require('../lib/fs');

const addBook = (req, res, sendResponse) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        body = JSON.parse(body);
        if(isAdmin(req)) {
            if(!body.title || !body.author) return sendResponse(res, 400, {message: 'your request is malform!'});
            const db = readDB();
            const new_book = {
                id: crypto.randomUUID(),
                title: body.title,
                author: body.author,
                available: 1
            };
            db.books.push(new_book);
            writeDB(db);
            return sendResponse(res, 201, {message: 'book created successfully!', new_book})
        } else return sendResponse(res, 403, {message: 'Access is not allowed!'});
    });
};

const rmBook = (req, bookID) => {
    let status_code, data;
    if(isAdmin(req)) {
        const db = readDB();
        const books = db.books;
        const bookIdx = books.findIndex(book => book.id === bookID);
        if(bookIdx === -1) [status_code, data] = [404, {message: 'book not found!'}];
        else {
            const deleted_book = books[bookIdx];
            books.splice(bookIdx, 1);
            writeDB(db);
            [status_code, data] = [200, {message: 'book deleted successfully', deleted_book}];
        }
    } else [status_code, data] = [403, {message: 'Access is not allowed!'}];
    return {status_code, data};
};

const updateBook = (req, res, sendResponse, bookID) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        if(isAdmin(req)) {
            const {title, author, available} = JSON.parse(body);
            const db = readDB();
            const books = db.books;
            const book = books.find(book => book.id === bookID);
            if(!book) return sendResponse(res, 404, {message: 'book not found!'});
            if(title) book.title = title;
            if(author) book.author = author;
            if(available) book.available = available;
            writeDB(db);
            sendResponse(res, 200, {message: 'book updated successfully!', updated_book: book});
        } else return sendResponse(res, 403, {message: 'Access is not allowed!'});
    });
};

const getBook = (req, bookID) => {
    let status_code, data;
    if(isAuthenticated(req)) {
        const books = readDB().books;
        const book = books.find(book => book.id === bookID);
        if(!book) [status_code, data] = [404, {message: 'book not found!'}];
        else [status_code, data] = [200, {book: book}];
    } else [status_code, data] = [403, {message: 'login is required!'}];
    return {status_code, data};
};

const getAllBooks = req => {
    let status_code, data;
    if(isAuthenticated(req)) [status_code, data] = [200, {books: readDB().books}]
    else [status_code, data] = [403, {message: 'login is required!'}];
    return {status_code, data};
};

const reserveBook = (req, bookID) => {
    let status_code, data;
    if(isAuthenticated(req)) {
        const db = readDB();
        const users = db.users;
        const books = db.books;

        const username = getUsername(req);
        const book = books.find(book => book.id === bookID);

        if(!book) [status_code, data] = [404, {message: 'book not found!'}];
        else if(book.available === 0) [status_code, data] = [409, {message: 'book is not available!'}];
        else {
            const now = new Date();
            const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
            const user = users.find(user => user.username === username);
            user.books.push({
                id: book.id,
                time: formattedDate
            });
            book.available = 0; // not available anymore
            writeDB(db);
            [status_code, data] = [200, {message: 'book reserved successfully!', book, time: formattedDate}];
        }
    } else [status_code, data] = [403, {message: 'login is required!'}];
    return {status_code, data};
};

const releaseBook = (req, bookID) => {
    let status_code, data;
    if(isAuthenticated(req)) {
        const db = readDB();
        const users = db.users;
        const books = db.books;

        const username = getUsername(req);
        const book = books.find(book => book.id === bookID);

        if(!book) [status_code, data] = [404, {message: 'book not found!'}];
        else {
            const user = users.find(user => user.username === username);
            const bookIdx = user.books.findIndex(book => book.id === bookID);
            if(bookIdx === -1) [status_code, data] = [404, {message: 'you do not reserve book before!'}];
            else {
                user.books.splice(bookIdx, 1);
                book.available = 1; // available now
                writeDB(db);
                [status_code, data] = [200, {message: 'book released successfully!', book}];
            }
        }
    } else [status_code, data] = [403, {message: 'login is required!'}];
    return {status_code, data};
};

module.exports = {
    addBook,
    rmBook,
    updateBook,
    getAllBooks,
    getBook,
    reserveBook,
    releaseBook,
};