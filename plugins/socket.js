import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const socket = io('http://localhost:4000'); // Your Socket.io server URL

    return {
        provide: {
            socket
        }
    };
});
