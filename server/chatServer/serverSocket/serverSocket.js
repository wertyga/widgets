module.exports = function initializeEvents(io) {
  io.on('connection', socket => {
    const { token } = socket.handshake.query;

    socket.on('testValue', data => {
      console.log(data);
    });
  });
};

