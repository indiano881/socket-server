<template>
    <div class="game-session">
      <h1 class="text-4xl font-bold">Match ID: {{ matchId }}</h1>
      <p>The game is loading... Implement your game logic here.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { io } from 'socket.io-client';
  
  const route = useRoute();
  const matchId = ref(route.params.id); // Retrieve the match ID from the route
  const socket = io('http://localhost:3000'); // Replace with your backend URL
  
  onMounted(() => {
    // Join the Socket.IO room for this match
    socket.emit('joinGameRoom', matchId.value);
  
    // Listen for game events
    socket.on('gameEvent', (data) => {
      console.log('Game event received:', data);
    });
  
    // Handle cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  });
  </script>
  
  <style>
  .game-session {
    text-align: center;
    padding: 20px;
  }
  </style>
  