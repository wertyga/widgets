import io from 'socket.io-client';
import { getStorage } from 'utils';
import { config as serverConfig } from 'server/chatServer/config/config';

export const initializeIo = () => {
  if (typeof window === 'undefined') return;
  const token = getStorage('token');
  if (!token) return;

  const { serverName } = serverConfig;
  return io(serverName, {
    autoConnect: false,
  });
};
