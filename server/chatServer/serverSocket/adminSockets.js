import _isEmpty from 'lodash/isEmpty';

export const getConnectedUsers = (sockets, domains, currentSocketId) => {
  const { rooms } = sockets.adapter;
  return domains.reduce((init, domainToken) => {
    const socketIds = rooms[domainToken].sockets || {};
    if (_isEmpty(socketIds)) return init;

    return {
      ...init,
      [domainToken]: Object.entries(socketIds)
        .filter(([key, value]) => value && key !== currentSocketId)
        .map(([key]) => sockets.connected[key].userId),
    };
  }, {});
};

export const joinToRooms = (domainsTokens, socket) => {
  domainsTokens.forEach((domainToken) => {
    socket.join(domainToken);
  });
};
