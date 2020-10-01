const app = require('express')();
const server = require('http').createServer(app);
const { config } = require('./config/config');
const initializeEvents = require('./serverSocket/serverSocket');

const io = require('socket.io')(server);
initializeEvents(io);

server.listen(config.PORT, () => console.log(`IO server ran at:${config.PORT}`));

