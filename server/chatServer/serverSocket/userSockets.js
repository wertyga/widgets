import { getRedisKey, setRedisKey } from '../redis/initializeRedis';

export const joinToRoom = (socket) => {
  const { token: domainToken, user } = socket.handshake.query;
  if (!domainToken) return {};

  socket.join(domainToken);
  socket.userId = user;
  return { room: domainToken, user };
};

export const userMessage = async ({ domainToken, message, user }, room, socket) => {
  if (!room) return;

  const oldMessages = await getRedisKey(user);

  const allMessages = [
    ...(oldMessages || []),
    { client: true, message },
  ];

  await setRedisKey(user, allMessages);
  socket.to(room).emit('user_messages', { user, messages: allMessages });
};
