<template>
    <div class="tournament px-4 py-8 max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold mb-6 text-center text-white">Game Modes</h1>
      <p class="text-gray-900 text-center mb-8 text-lg">
        Select a mode to compete with other players!
      </p>
  
      <!-- Game Mode Selection -->
      <div class="flex items-center justify-evenly mb-12">
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">1 vs 1</h2>
          <p class="text-gray-600 mb-6">Challenge another player to a quick match.</p>
          <button
            class="w-full bg-green-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Create Match
          </button>
        </div>
        
  </div>
  
  
  
     
      
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    middleware: 'auth', // Specify the middleware name
  });
  

  
  </script>
  
 
  