<template>
    <div class="tournament px-4 py-8 max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold mb-6 text-center text-blue-600">Game Modes</h1>
      <p class="text-gray-700 text-center mb-8 text-lg">
        Select a mode to compete with other players!
      </p>
  
      <!-- Game Mode Selection -->
      <div class="flex items-center justify-evenly mb-12">
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">1 vs 1 Best of 3</h2>
          <p class="text-gray-600 mb-6">Challenge another player to a quick match.</p>
          <button
            @click="createRoom('single')"
            class="w-full bg-green-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Create Match
          </button>
        </div>
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">1 vs 1 Best of 5</h2>
          <p class="text-gray-600 mb-6">
            Compete in a best-of-5 series with another player.
          </p>
          <button
            @click="createRoom('bestOf5')"
            class="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
          >
            Create Match
          </button>
        </div>
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Tournament Mode</h2>
          <p class="text-gray-600 m-6">
            Join an 8-player tournament and prove your skills.
          </p>
          <button
            @click="createRoom('tournament')"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Create Tournament
          </button>
        </div>
      </div>
  
      <!-- Room Controls -->
      <div class="room-controls text-center">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Join a Room</h2>
        <div class="flex flex-col md:flex-row justify-center gap-4 items-center">
          <input
            v-model="roomId"
            placeholder="Enter Room ID"
            class="w-full md:w-auto border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            @click="joinRoom"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Join Room
          </button>
        </div>
      </div>
  
      <!-- Active Game Room -->
      <div v-if="gameData" class="mt-8 bg-white p-6 border border-gray-200 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Game Room: {{ roomId }}</h2>
        <p class="text-gray-700 mb-6">Current Status: {{ gameData }}</p>
        <button
          @click="makeMove"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
        >
          Make a Move
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    middleware: 'auth', // Specify the middleware name
  });
  
  import { ref, onMounted, onUnmounted } from 'vue';
  import { io } from 'socket.io-client';
  
  const roomId = ref('');
  const socket = ref(null);
  const gameData = ref(null);
  
  function createRoom(mode) {
    socket.value.emit('createRoom', { mode, userId: user.value.id });
    alert(
      `Creating a ${
        mode === 'single'
          ? '1 vs 1 Single Match'
          : mode === 'bestOf5'
          ? 'Best of 5 Match'
          : 'Tournament'
      }`
    );
  }
  
  function joinRoom() {
    if (!roomId.value) return alert('Please enter a Room ID');
    socket.value.emit('joinRoom', { roomId: roomId.value, userId: user.value.id });
  }
  
  function makeMove() {
    socket.value.emit('playerMove', { roomId: roomId.value, move: 'Player’s move' });
  }
  
  onMounted(() => {
    socket.value = io('http://localhost:3000'); // Connect to Socket.io server
    socket.value.on('updateGame', (data) => {
      gameData.value = data; // Update game data when receiving updates from the server
    });
  
    socket.value.on('gameOver', (data) => {
      alert(`Game Over! ${data.winner} won the match.`);
      gameData.value = null;
    });
  });
  
  onUnmounted(() => {
    if (socket.value) socket.value.disconnect(); // Clean up socket connection on component unmount
  });
  </script>
  
  <style scoped>
  /* Additional global styles (if needed) can go here */
  </style>
  