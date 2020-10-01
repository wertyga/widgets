const express = require('express');
const path = require('path');

const PORT = 8000;

const server = express();

server.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, './TEST.html'));
});

server.listen(PORT, function() { console.log('Listen TEST on :' + PORT) });
