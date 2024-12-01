import { createServer } from 'http';
import { Server } from 'socket.io';

// Create an HTTP server
const httpServer = createServer();

// Initialize Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000', // Your Nuxt app URL
        methods: ['GET', 'POST'],
    },
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
    console.log(secretCode);
    return secretCode;
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle joining a match
    socket.on('joinMatch', (matchId) => {
        if (!matches[matchId]) {
            matches[matchId] = {
                players: [],
                code: generateSecretCode(),
                readyPlayers: 0,
                results: {},
            };
        }

        const match = matches[matchId];

        if (match.players.length < 2) {
            match.players.push(socket.id);
            socket.join(matchId);
            console.log(`Player joined match ${matchId}:`, match.players);

            io.to(matchId).emit('playerJoined', { players: match.players.length });

            if (match.players.length === 2) {
                io.to(matchId).emit('waitingForReady');
            }
        } else {
            socket.emit('matchFull', matchId);
        }
    });

    // Handle player ready
    socket.on('playerReady', ({ matchId, characterId }) => {
        const match = matches[matchId];

        if (match && match.players.includes(socket.id)) {
            match.readyPlayers += 1;
            console.log(`Player ${socket.id} is ready in match ${matchId} with character ${characterId}`);
            socket.to(matchId).emit('opponentReady', { characterId });

            if (match.readyPlayers === 2) {
                io.to(matchId).emit('bothPlayersReady', match.code);

                let countdown = 10;
                const countdownInterval = setInterval(() => {
                    if (countdown > 0) {
                        io.to(matchId).emit('countdown', countdown);
                        countdown--;
                    } else {
                        clearInterval(countdownInterval);
                        io.to(matchId).emit('gameStart', { code: match.code });
                    }
                }, 1000);
            }
        }
    });

    // Handle Mist of Madness power
    socket.on('mistOfMadness', ({ matchId }) => {
        const match = matches[matchId];

        if (match) {
            const opponentSocketId = match.players.find((id) => id !== socket.id);

            if (opponentSocketId) {
                io.to(opponentSocketId).emit('applyMistOfMadness');
                console.log(`Mist of Madness applied to player ${opponentSocketId} in match ${matchId}`);
            } else {
                console.error(`No opponent found for player ${socket.id} in match ${matchId}`);
            }
        } else {
            console.error(`Match ${matchId} not found.`);
        }
    });

    // Handle player win
    socket.on('playerWin', ({ matchId, timeLeft }) => {
        const match = matches[matchId];

        if (match) {
            match.results[socket.id] = { timeLeft, status: 'win' };

            if (Object.keys(match.results).length === 2) {
                declareWinner(matchId);
            }
        }
    });

    // Handle player loss
    socket.on('playerLose', ({ matchId }) => {
        const match = matches[matchId];

        if (match) {
            match.results[socket.id] = { timeLeft: 0, status: 'lose' };

            if (Object.keys(match.results).length === 2) {
                declareWinner(matchId);
            }
        }
    });

    // Handle player disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);

        for (const matchId in matches) {
            const match = matches[matchId];
            const playerIndex = match.players.indexOf(socket.id);

            if (playerIndex !== -1) {
                match.players.splice(playerIndex, 1);
                console.log(`Player ${socket.id} left match ${matchId}`);

                if (match.players.length === 0) {
                    delete matches[matchId];
                    console.log(`Match ${matchId} deleted`);
                } else {
                    io.to(matchId).emit('opponentLeft');
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
