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

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle joining a match
    socket.on('joinMatch', (matchId) => {
        if (!matches[matchId]) {
            matches[matchId] = {
                players: [],
                code: generateSecretCode(), // Generate a random secret code
                readyPlayers: 0, // Track how many players are ready
                results: {}, // Store results for players
            };
        }

        const match = matches[matchId];

        if (match.players.length < 2) {
            match.players.push(socket.id);
            socket.join(matchId);
            console.log(`Player joined match ${matchId}:`, match.players);

            // Notify all players of the current match status
            io.to(matchId).emit('playerJoined', { players: match.players.length });

            // If two players have joined, wait for readiness
            if (match.players.length === 2) {
                io.to(matchId).emit('waitingForReady'); // Notify players to get ready
            }
        } else {
            socket.emit('matchFull', matchId); // Notify player that match is full
        }
    });

    // Handle player ready
    socket.on('playerReady', ({ matchId, characterId }) => {
        const match = matches[matchId];

        if (match && match.players.includes(socket.id)) {
            match.readyPlayers += 1;
            console.log(`Player ${socket.id} is ready in match ${matchId} with character ${characterId}`);

            // Notify other players that this player is ready
            socket.to(matchId).emit('opponentReady', { characterId });

            // If both players are ready, start the game
            if (match.readyPlayers === 2) {
                io.to(matchId).emit('bothPlayersReady', match.code); // Notify clients that both players are ready

                // Start the countdown
                let countdown = 10; // Countdown duration in seconds
                const countdownInterval = setInterval(() => {
                    if (countdown > 0) {
                        io.to(matchId).emit('countdown', countdown); // Send countdown updates
                        countdown--;
                    } else {
                        clearInterval(countdownInterval); // Stop the countdown
                        io.to(matchId).emit('gameStart', { code: match.code }); // Notify clients that the game has started
                    }
                }, 1000);
            }
        }
    });

    // Handle player win
    socket.on('playerWin', ({ matchId, timeLeft }) => {
        const match = matches[matchId];

        if (match) {
            match.results[socket.id] = { timeLeft, status: 'win' };

            // Check if both players have finished
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

            // Check if both players have finished
            if (Object.keys(match.results).length === 2) {
                declareWinner(matchId);
            }
        }
    });

    // Declare winner and notify players
    const declareWinner = (matchId) => {
        const match = matches[matchId];
        const [player1, player2] = match.players;
        const result1 = match.results[player1];
        const result2 = match.results[player2];

        let winnerId, loserId, winnerTimeLeft;

        if (result1.timeLeft > result2.timeLeft) {
            winnerId = player1;
            loserId = player2;
            winnerTimeLeft = result1.timeLeft;
        } else if (result2.timeLeft > result1.timeLeft) {
            winnerId = player2;
            loserId = player1;
            winnerTimeLeft = result2.timeLeft;
        }

        // Notify both players
        if (winnerId) {
            io.to(winnerId).emit('gameResult', {
                winnerId,
                timeLeft: winnerTimeLeft,
                message: 'You won!',
            });
            io.to(loserId).emit('gameResult', {
                winnerId,
                timeLeft: winnerTimeLeft,
                message: `You lost. Opponent had ${winnerTimeLeft} seconds left.`,
            });
        } else {
            // It's a draw
            io.to(player1).emit('gameResult', { message: 'It\'s a draw!' });
            io.to(player2).emit('gameResult', { message: 'It\'s a draw!' });
        }

        // Clean up match data
        delete matches[matchId];
    };

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
                } else {
                    // Notify remaining player that opponent left
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
