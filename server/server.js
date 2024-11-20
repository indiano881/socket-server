import { createServer } from 'http';
import { Server } from 'socket.io';

// Create an HTTP server
const httpServer = createServer();

// Initialize Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000', // Your Nuxt app URL
        methods: ['GET', 'POST']
    }
});

// Set up Socket.io listeners
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Example: Handle guess event
    socket.on('guess', (data) => {
        console.log('Guess received:', data);
        socket.broadcast.emit('newGuess', data); // Send to other clients
    });

    // Example: Handle game over event
    socket.on('gameOver', (winner) => {
        io.emit('gameOver', winner); // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
const PORT = 4000;
httpServer.listen(PORT, () => {
    console.log(`Socket.io server is running on http://localhost:${PORT}`);
});
