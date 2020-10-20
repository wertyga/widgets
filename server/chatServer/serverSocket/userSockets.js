import { getRedisKey, setRedisKey } from '../redis/initializeRedis';
import { keys } from './helpers';

export const userMessage = async ({ userID, origin, message }, socket) => {
  const key = keys.userMessageKey(userID, origin);
  const oldMessages = await getRedisKey(key);
  await setRedisKey(key, [...(oldMessages || []), { user: true, message }]);

  socket.to(origin).emit('user_message', { userID, origin, message: { user: true, message }});
};

export const userConnect = async ({ origin, userID }, socket) => {
  const key = keys.connectedUsers(origin);
  socket.userID = userID;
  const connectedUsers = await getRedisKey(key);
  await setRedisKey(key, [
    ...(connectedUsers || []).filter(item => item.userID !== userID),
    { userID, socketID: socket.id },
  ]);

  socket.to(origin).emit('user_connect', { socketID: socket.id, userID, origin });
};

export const userDisconnect = async ({ origin, userID }, socket) => {
  const key = keys.connectedUsers(origin);
  const connectedUsers = await getRedisKey(key);
  await setRedisKey(key, connectedUsers.filter(item => item.userID !== userID));

  socket.to(origin).emit('user_disconnected', { origin, userID });
};

export const getUserMessages = async ({ userID, origin }, socket) => {
  const key = keys.userMessageKey(userID, origin);
  const oldMessages = await getRedisKey(key);

  socket.emit('user_messages', { userID, origin, messages: oldMessages });
};

export const getAdminConnected = async ({ userID, origin }, socket, io) => {
  const { sockets } = io.sockets.adapter.rooms[origin] || { sockets: {} };
  const adminsSocketID = Object.keys(sockets);
  socket.emit(`admin_connected_${origin}`, adminsSocketID);
};
