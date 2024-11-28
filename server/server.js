import { createServer } from 'http';
import { Server } from 'socket.io';

// Create an HTTP server
const httpServer = createServer();

// Initialize Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000', // Your Nuxt app URL// check if redeploys
        methods: ['GET', 'POST']
    }
});

const matches = {}; // Store match data in-memory
const availableColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'brown'];

// Helper function to generate a random secret code
function generateSecretCode(length = 4) {
    const secretCode = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        secretCode.push(availableColors[randomIndex]);
    }
    console.log(secretCode)
    return secretCode;
}

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle joining a match
    socket.on('joinMatch', (matchId) => {
        if (!matches[matchId]) {
            matches[matchId] = {
                players: [],
                code: generateSecretCode(), // Generate a random secret code
            };
            
        }

        const match = matches[matchId];

        if (match.players.length < 2) {
            match.players.push(socket.id);
            socket.join(matchId);
            console.log(`Player joined match ${matchId}:`, match.players);

            // If two players have joined, start the game
            if (match.players.length === 2) {
                io.to(matchId).emit('startGame', match.code); // Send the secret code to both players
            }
        } else {
            socket.emit('matchFull', matchId); // Notify player that match is full
        }
    });

    // Handle player disconnecting
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);

        // Iterate through matches to remove the player
        for (const matchId in matches) {
            const match = matches[matchId];
            const playerIndex = match.players.indexOf(socket.id);

            if (playerIndex !== -1) {
                match.players.splice(playerIndex, 1);
                console.log(`Player ${socket.id} left match ${matchId}`);

                // If the match is empty, delete it
                if (match.players.length === 0) {
                    delete matches[matchId];
                    console.log(`Match ${matchId} deleted`);
                }
                break;
            }
        }
    });
});

// Start the server
const PORT = 4000;
httpServer.listen(PORT, () => {
    console.log(`Socket.io server is running on http://localhost:${PORT}`);
});
