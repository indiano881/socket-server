<template>
    <div>
      <!-- Win Modal -->
      <div 
        v-if="showWinModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 class="text-4xl font-bold text-green-600">You Win!</h1>
          
          <!-- Pass secretCombination to the new component -->
          <SecretCombinationDisplay :secretCombination="secretCombination" />
  
          <p class="text-xl mt-4 text-gray-900">
            Time left: <span class="font-bold">{{ gameCountdown }} seconds</span>
          </p>
          <button 
            class="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600"
            @click="restartGame"
          >
            Back to lobby
          </button>
        </div>
      </div>
  
      <!-- Lose Modal -->
      <div 
        v-if="showLoseModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 class="text-4xl font-bold text-red-600">You Lose!</h1>
          <p class="text-xl mt-4">The correct combination was:</p>
          
          <!-- Pass secretCombination to the new component -->
          <SecretCombinationDisplay :secretCombination="secretCombination" />
          
          <button 
            class="bg-red-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-red-600"
            @click="restartGame"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import SecretCombinationDisplay from './SecretCombinationDisplay.vue'; // Import the new component
  
  // Reactive variables
  import { ref } from "vue";
  const showWinModal = ref(false);
  const showLoseModal = ref(false);
  const secretCombination = ref(["red", "blue", "green", "yellow"]); // Example secret combination
  const gameCountdown = ref(60);
  
  // Restart game function
  const restartGame = () => {
    showWinModal.value = false;
    showLoseModal.value = false;
    secretCombination.value = [];
  };
  </script>
  