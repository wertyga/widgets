import io from 'socket.io-client';
import shortID from 'short-id';
import { config as serverConfig } from 'server/chatServer/config/config';

export const initializeIo = () => {
  if (typeof window === 'undefined' || !window.W_widgets || !window.W_widgets.token) return;
  if (!window.W_widgets.user) window.W_widgets.user = shortID.generate();

  const { serverName } = serverConfig;
  const { token, user } = window.W_widgets;
  return io(`${serverName}?token=${token}&user=${user}`, {
    autoConnect: false,
  });
};
