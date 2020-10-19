import { getRedisKey, setRedisKey } from '../redis/initializeRedis';
import * as adminSocket from './adminSockets';
import * as userSocket from './userSockets';
import * as commonSocket from './commonSocket';

module.exports = function initializeEvents(io) {
  io.on('connection', socket => {
    let user;
    // const { room, user } = userSocket.joinToRoom(socket); // if we have a room and user that mean client connected
    // if (room && user) {
    //   socket.to(room).emit('user_connect', { user, room });
    // }

    socket.on('user_connect', async data => {
      user = data;
      await userSocket.userConnect(data, socket);
    });
    socket.on('disconnect', () => {
      if (user) userSocket.userDisconnect(user, socket);
    });

    socket.on('get_user_messages', (data) => userSocket.getUserMessages(data, socket));
    socket.on('user_message', (data) => userSocket.userMessage(data, socket));
    // Admin
    socket.on('admin_connect', origins => adminSocket.adminConnect(origins, socket));
    socket.on('get_connected_users', origins => adminSocket.getConnectedUsers(origins, socket));
    socket.on('admin_message', data => adminSocket.adminMessage(data, socket));
    // Common
    socket.on('message_edit', data => commonSocket.messageEdit(data, socket));
    socket.on('message_delete', data => commonSocket.messageDelete(data, socket));

    // socket.on('admin_connect', async (domains = []) => {
    //   if (!domains || !domains.length) return;
    //
    //   const domainsWithAdmin = await getRedisKey('adminActive');
    //   const updatedAdmins = (domainsWithAdmin || []).filter(({ id }) => socket.id !== id);
    //   await setRedisKey('adminActive', [...updatedAdmins, { id: socket.id, domains }]);
    //   adminSocket.joinToRooms(domains, socket);
    // });

    // socket.on('get_connected_users', ({ domains }) => {
    //   if (!domains) return;
    //   const users = adminSocket.getConnectedUsers(io.sockets, domains, socket.id);
    //   socket.emit('connected_users', users);
    // });
    //
    // socket.on('get_user_messages', async userId => {
    //   const messages = await getRedisKey(userId);
    //
    //   socket.emit('user_messages', { user: userId, messages: messages || [] });
    // });
    //
    // socket.on('user_message', (data) => userSocket.userMessage(data, room, socket));
    // socket.on('admin_message', (data) => adminSocket.adminMessage(data, socket, io.sockets));
    //
    // socket.on('disconnect', () => {
    //   if (room && user) {
    //     socket.leave(room);
    //     socket.to(room).emit('user_disconnected', user);
    //   }
    // });
  });
};

