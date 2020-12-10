import io from 'socket.io-client';
import { getStorage } from 'utils';

export const initializeIo = () => {
  if (typeof window === 'undefined') return;
  const token = getStorage('token');
  if (!token) return;
  
  return io(process.env.IO_SERVER_NAME, {
    autoConnect: false,
  });
};
