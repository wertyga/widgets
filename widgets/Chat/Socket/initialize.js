import io from 'socket.io-client';
import { config as serverConfig } from 'server/chatServer/config/config';

export const initializeIo = () => {
  if (typeof window === 'undefined' || !window.W_widgets || !window.W_widgets.token) return;

  const { serverName } = serverConfig;
  return io(serverName, {
    autoConnect: false,
  });
};
