const express = require('express');
const path = require('path');

const PORT = 8000;

const server = express();

server.use(express.static(__dirname));
server.use(express.static(path.join(__dirname, '../public')));

server.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, './TEST.html'));
});

server.listen(PORT, function() { console.log('Listen TEST on :' + PORT) });
