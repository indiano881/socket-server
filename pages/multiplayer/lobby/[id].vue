<template>
  <div class="game-session">
    <h1 class="text-4xl font-bold">Match ID: {{ matchId }}</h1>
    <p v-if="loading">The game is loading...</p>
    <p v-else-if="gameStarted">The game has started! Good luck!</p>
    <p v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    <p v-else>Waiting for another player to join...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';

// Reactive variables
const matchId = ref('');
const loading = ref(true);
const gameStarted = ref(false);
const errorMessage = ref('');

// Socket.io setup
const socket = io('http://localhost:4000'); // Connect to your Socket.io server

// Extract matchId and set up Socket.io logic
onMounted(() => {
  const route = useRoute();
  matchId.value = route.params.id; // Extract matchId from the URL
  console.log(route.params.id)

  if (matchId.value) {
    // Notify the server of joining the match
    socket.emit('joinMatch', matchId.value);

    // Handle the server response when the game starts
    socket.on('startGame', () => {
      loading.value = false;
      gameStarted.value = true;
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
</style>
