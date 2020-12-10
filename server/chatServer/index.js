const app = require('express')();
const server = require('http').createServer(app);
const initializeEvents = require('./serverSocket/serverSocket');
require('./redis/initializeRedis');

const io = require('socket.io')(server);
initializeEvents(io);

server.listen(process.env.IO_SERVER_PORT, () => console.log(`IO server ran at:${process.env.IO_SERVER_PORT}`));

