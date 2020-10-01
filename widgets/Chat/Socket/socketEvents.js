import { initializeIo } from './initialize';

export const socket = initializeIo();

socket.on('connect', () => {

});
