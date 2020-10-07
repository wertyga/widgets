import { initializeIo } from './initialize';

export const socket = initializeIo();

socket.on('connect', () => {
  console.log('Socket connected');
});
socket.on('disconnect', () => {
  console.log('Socket disconnected');
});
