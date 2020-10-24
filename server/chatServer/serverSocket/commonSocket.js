import { keys } from "./helpers";
import { getRedisKey, setRedisKey } from "../redis/initializeRedis";

export const messageEdit = async ({ userID, socketID, origin, index, value, admin }, socket) => {
  const key = keys.userMessageKey(userID, origin);
  const messages = await getRedisKey(key);
  const editedMessages = messages.map((m, i) => (
    i === index ? { ...m, message: value } : m
  ));
  await setRedisKey(key, editedMessages, true);

  if (admin) {
    socket.to(socketID).emit('user_messages', { messages: editedMessages });
  } else {
    socket.to(origin).emit('user_messages', { userID, origin, messages: editedMessages });
  }
  socket.emit('user_messages', { userID, origin, messages: editedMessages });
};

export const messageDelete = async ({ userID, socketID, origin, index, value, admin }, socket) => {
  const key = keys.userMessageKey(userID, origin);
  const messages = await getRedisKey(key);
  const newMessages = messages.filter((_, i) => i !== index);
  await setRedisKey(key, newMessages, true);

  if (admin) {
    socket.to(socketID).emit('user_messages', { messages: newMessages });
  } else {
    socket.to(origin).emit('user_messages', { userID, origin, messages: newMessages });
  }
  socket.emit('user_messages', { userID, origin, messages: newMessages });

};
