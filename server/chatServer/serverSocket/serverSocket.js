import { getRedisKey, setRedisKey } from '../redis/initializeRedis';
import * as adminSocket from './adminSockets';
import * as userSocket from './userSockets';



module.exports = function initializeEvents(io) {
  io.on('connection', socket => {
    const { room, user } = userSocket.joinToRoom(socket); // if we have a room and user that mean client connected
    if (room && user) {
      socket.to(room).emit('user_connect', { user, room });
    }

    socket.on('admin_connect', async (domains = []) => {
      if (!domains || !domains.length) return;

      const domainsWithAdmin = await getRedisKey('adminActive');
      const updatedAdmins = (domainsWithAdmin || []).filter(({ id }) => socket.id !== id);
      await setRedisKey('adminActive', [...updatedAdmins, { id: socket.id, domains }]);
      adminSocket.joinToRooms(domains, socket);
    });

    socket.on('get_connected_users', ({ domains }) => {
      if (!domains) return;
      const users = adminSocket.getConnectedUsers(io.sockets, domains, socket.id);
      socket.emit('connected_users', users);
    });

    socket.on('get_user_messages', async userId => {
      const messages = await getRedisKey(userId);

      socket.emit('user_messages', { user: userId, messages: messages || [] });
    });

    socket.on('user_message', (data) => userSocket.userMessage(data, room, socket));

    socket.on('disconnect', () => {
      if (room && user) {
        socket.leave(room);
        socket.to(room).emit('user_disconnected', user);
      }
    });
  });
};

