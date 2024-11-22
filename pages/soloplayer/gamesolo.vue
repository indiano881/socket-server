<template>
    <div class="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
      <!-- Title: Hide during countdown and gameboard -->
      <h1 v-if="!isCountdownRunning && !isGameStarted" class="text-4xl font-bold text-gray-800 text-center">
        Choose your character
      </h1>
  
      <!-- Character Selection -->
      <div v-if="!isGameStarted && !isCountdownRunning" class="flex flex-col">
        <CharacterSelection @characterSelected="onCharacterSelected" />
      </div>
  
      <!-- Ready Button -->
      <div v-if="!isGameStarted && !isCountdownRunning" class="flex flex-col items-center">
        <button 
          :disabled="!selectedCharacter" 
          class="bg-green-500 text-white text-4xl px-8 py-4 rounded-lg hover:bg-green-600 transition duration-300 border-2 border-black md:w-[70%]"
          @click="startCountdown"
        >
          Ready???
        </button>
      </div>
  
      <!-- Countdown Before Game Starts -->
      <div v-if="isCountdownRunning" class="flex justify-center items-center h-96">
        <h1 class="text-9xl font-bold text-yellow-400">{{ countdown }}</h1>
      </div>
  
      <!-- Gameboard -->
      <div v-if="isGameStarted" class=" relative gameboard bg-purple-300 rounded-lg shadow-md p-8">
        <!-- Character Image on Top Right -->
        <div class="absolute top-4 right-4">
          <img 
            :src="selectedCharacter?.icon" 
            :alt="selectedCharacter?.label" 
            class="w-20 h-20 rounded-full border-4 border-gray-800 bg-white"
          />
        </div>
  
        <!-- Timer Countdown in the Center -->
        <div class="flex justify-center items-center h-full">
          <h1 
            class="text-6xl font-bold"
            :class="{
              'text-green-600': gameCountdown > 15,
              'text-yellow-600': gameCountdown <= 15 && gameCountdown > 5,
              'text-red-600': gameCountdown <= 5,
            }"
          >
            {{ gameCountdown }}
          </h1>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  // State variables
  const selectedCharacter = ref(null);
  const isCountdownRunning = ref(false);
  const isGameStarted = ref(false);
  const countdown = ref(3); // Pre-game countdown
  const gameCountdown = ref(30); // In-game countdown
  const progress = ref(100); // Progress bar width
  
  // Handle the emitted event
  const onCharacterSelected = (character) => {
    selectedCharacter.value = character;
    console.log(selectedCharacter.value);
  };
  
  // Start the pre-game countdown
  const startCountdown = () => {
    isCountdownRunning.value = true;
  
    const interval = setInterval(() => {
      countdown.value -= 1;
  
      if (countdown.value === 0) {
        clearInterval(interval);
        isCountdownRunning.value = false;
        isGameStarted.value = true;
  
        // Start the game countdown and progress bar
        startGameCountdown();
      }
    }, 1000);
  };
  
  // Start the in-game countdown and manage the progress bar
  const startGameCountdown = () => {
    const totalGameTime = 30; // seconds
    const interval = setInterval(() => {
      gameCountdown.value -= 1;
      progress.value = (gameCountdown.value / totalGameTime) * 100;
  
      if (gameCountdown.value <= 0) {
        clearInterval(interval);
        // Add any game-over logic here
        console.log("Game Over!");
      }
    }, 1000);
  };
  </script>
  