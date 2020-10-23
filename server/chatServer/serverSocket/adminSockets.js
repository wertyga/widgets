import _isEmpty from 'lodash/isEmpty';
import _flatten from 'lodash/flatten';
import { getRedisKey, setRedisKey } from '../redis/initializeRedis';
import {keys} from "./helpers";

export const getConnectedUsers = async (origins = [], socket) => {
  const users = await Promise.all(
    origins.map((origin) => {
      const key = `connected_users_${origin}`;
      return getRedisKey(key);
    })
  );

  const connectedUsers =
    _flatten(
      origins.map((origin, i) => {
          if (!users[i]) return [];
          return users[i].map((user) => ({ origin, ...user  }));
        })
    )
      .reduce((init, next) => ({
        ...init,
        [next.origin]: [...(init[next.origin] || []), next],
      }), {});
  socket.emit('connected_users', connectedUsers);
};

export const adminConnect = (origins, socket, io) => {
  origins.forEach((origin) => {
    socket.join(origin);
    const { sockets } = io.sockets.adapter.rooms[origin] || { sockets: {} };
    const adminsSocketID = Object.keys(sockets);
    socket.broadcast.emit(`admin_connected_${origin}`, adminsSocketID);
  });
};

export const adminDisconnected = (origins, socket, io) => {
  origins.forEach((origin) => {
    const { sockets } = io.sockets.adapter.rooms[origin] || { sockets: {} };
    const adminsSocketID = Object.keys(sockets);
    socket.broadcast.emit(`admin_connected_${origin}`, adminsSocketID);
  });
};

export const adminMessage = async ({ message, socketID, origin, userID }, socket) => {
  const key = keys.userMessageKey(userID, origin);
  const oldMessages = await getRedisKey(key);
  await setRedisKey(key, [...(oldMessages || []), { message }]);

  socket.to(socketID).emit('admin_message', message);
};

export const adminActive = ({ socketID, active }, socket) => {
  socket.to(socketID).emit('admin_activity', active);
};
