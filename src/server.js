const http = require('http');
const router = require('./router');
const {PORT} = require('./config');

const server = http.createServer(router);

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} successfully!`);
});