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
const matches = {}; // Store match data in-memory

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);//WORKS

  // Handle joining a match
  socket.on('joinMatch', (matchId) => {
    if (!matches[matchId]) {
      matches[matchId] = { players: [] };
    }

    const match = matches[matchId];

    if (match.players.length < 2) {
      match.players.push(socket.id);
      socket.join(matchId);
      console.log(`Player joined match ${matchId}:`, match.players);

      // If two players have joined, start the game
      if (match.players.length === 2) {
        io.to(matchId).emit('startGame', matchId);
      }
    } else {
      socket.emit('matchFull', matchId);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // Handle player leaving logic if needed
  });
});
// Start the server
const PORT = 4000;
httpServer.listen(PORT, () => {
    console.log(`Socket.io server is running on http://localhost:${PORT}`);
});
