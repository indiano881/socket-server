<template>
  <div class="game-session">
    <h1 class="text-4xl font-bold">Match ID: {{ matchId }}</h1>
    <p v-if="loading">The game is loading...</p>
    <p v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    <p v-else-if="countdown > 0" class="text-2xl font-bold">Game starts in: {{ countdown }}</p>
    <div v-else-if="gameStarted" class="game-board">
      <h2 class="text-3xl font-bold mb-4">Gameboard</h2>
      <p class="text-xl">Find the secret code: <strong>{{ secretCode }}</strong></p>
      <div class="board">
        <!-- Example board structure -->
        <div v-for="row in rows" :key="row" class="row">
          <div v-for="cell in cols" :key="cell" class="cell">
            <!-- Each cell can later represent a part of the game -->
            ?
          </div>
        </div>
      </div>
    </div>
    <p v-else>Waiting for another player to join...</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';

// Reactive variables
const matchId = ref('');
const loading = ref(true);
const countdown = ref(0); // Countdown timer
const gameStarted = ref(false);
const errorMessage = ref('');
const secretCode = ref(''); // The secret code for both players

// Gameboard structure
const rows = 6; // Number of rows
const cols = 4; // Number of columns

const socket = io('http://localhost:4000'); // Connect to your Socket.io server

// Extract id and set up Socket.io logic
onMounted(() => {
  const route = useRoute();
  matchId.value = route.params.id; // Extract id from the URL

  if (matchId.value) {
    // Notify the server of joining the match
    socket.emit('joinMatch', matchId.value);

    // Handle the server response when the game starts
    socket.on('startGame', (code) => {
      loading.value = false;

      // Set the secret code
      secretCode.value = code;

      // Start countdown
      let timer = 3;
      countdown.value = timer;
      const interval = setInterval(() => {
        timer -= 1;
        countdown.value = timer;

        if (timer === 0) {
          clearInterval(interval);
          gameStarted.value = true;
          countdown.value = 0;
        }
      }, 1000);
    });

    // Handle the case when the match is full
    socket.on('matchFull', () => {
      loading.value = false;
      errorMessage.value = 'This match is already full. Please try another match.';
    });

    // Handle errors
    socket.on('invalidMatch', () => {
      loading.value = false;
      errorMessage.value = 'Invalid match ID. Please check the link.';
    });
  } else {
    loading.value = false;
    errorMessage.value = 'No match ID provided. Please use a valid match link.';
  }
});

// Clean up socket connection on component unmount
onUnmounted(() => {
  socket.disconnect();
});
</script>

<style>
.game-session {
  text-align: center;
  padding: 20px;
}
.text-red-500 {
  color: red;
}
.text-green-500 {
  color: green;
}
.game-board {
  margin-top: 20px;
}
.board {
  display: grid;
  grid-template-rows: repeat(6, 50px); /* Adjust row size */
  grid-template-columns: repeat(4, 50px); /* Adjust column size */
  gap: 10px;
  justify-content: center;
}
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
</style>
