import * as adminSocket from './adminSockets';
import * as userSocket from './userSockets';
import * as commonSocket from './commonSocket';

module.exports = function initializeEvents(io) {
  io.on('connection', socket => {
    let user;
    let adminOrigins = [];

    socket.on('user_connect', async data => {
      user = data;
      await userSocket.userConnect(data, socket);
    });
    socket.on('disconnect', () => {
      if (user) {
        userSocket.userDisconnect(user, socket);
      } else {
        adminSocket.adminDisconnected(adminOrigins, socket, io);
      }
    });

    // User
    socket.on('get_user_messages', (data) => userSocket.getUserMessages(data, socket));
    socket.on('user_message', (data) => userSocket.userMessage(data, socket));
    socket.on('get_admin_connected', (data) => userSocket.getAdminConnected(data, socket, io));
    socket.on('user_active', (data) => userSocket.userActive(data, socket));
    // Admin
    socket.on('admin_connect', origins => {
      adminOrigins = origins;
      adminSocket.adminConnect(origins, socket, io);
    });
    socket.on('get_connected_users', origins => adminSocket.getConnectedUsers(origins, socket));
    socket.on('admin_message', data => adminSocket.adminMessage(data, socket));
    socket.on('admin_active', data => adminSocket.adminActive(data, socket));
    // Common
    socket.on('message_edit', data => commonSocket.messageEdit(data, socket));
    socket.on('message_delete', data => commonSocket.messageDelete(data, socket));
  });
};

