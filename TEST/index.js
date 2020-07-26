const express = require('express');
const path = require('path');

const server = express();

server.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, './TEST.html'));
});

server.listen(5002, function() { console.log('Listen TEST on :5001') });