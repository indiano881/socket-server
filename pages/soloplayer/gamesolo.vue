<template>
  <div class="p-4 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
    <!-- Title: Hide during countdown and gameboard -->
    <h1 
      v-if="!isCountdownRunning && !isGameStarted" 
      class="text-4xl font-bold text-gray-800 text-center"
    >
      Choose your character
    </h1>

    <!-- Character Selection -->
    <div v-if="!isGameStarted && !isCountdownRunning" class="flex flex-col">
      <CharacterSelection @characterSelected="onCharacterSelected" />
    </div>

    <!-- Ready Button -->
    <div 
      v-if="!isGameStarted && !isCountdownRunning" 
      class="flex flex-col items-center"
    >
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
    <div 
      v-if="isGameStarted" 
      class="flex flex-col bg-purple-300 rounded-lg shadow-md border-2 border-black"
    >
      <!-- Character Image and Timer -->
      <div class="flex items-center justify-between px-4 py-2">
        <!-- Timer Countdown in the Center -->
        <h1 
          class="text-5xl font-bold text-center flex-1"
          :class="{
            'text-green-600': gameCountdown > 15,
            'text-yellow-600': gameCountdown <= 15 && gameCountdown > 5,
            'text-red-600': gameCountdown <= 5,
          }"
        >
          {{ gameCountdown }}
        </h1>

        <!-- Character Image on the Right -->
        <img 
          :src="selectedCharacter?.icon" 
          :alt="selectedCharacter?.label" 
          class="w-20 h-20 p-1 rounded-full border-2 border-gray-800 bg-white ml-4"
        />
      </div>

      <!-- Gameboard Content -->
      <div class="flex space-x-4">
        <!-- Color Choices Grid -->
        <div class="flex">
          <div 
            class="grid grid-cols-4 gap-2 border-2 border-gray-300 rounded-lg p-2 bg-gray-100"
          >
            <div 
              v-for="(color, index) in colorGrid" 
              :key="'color-grid-' + index" 
              class="w-10 h-10 rounded-full"
              :style="{ backgroundColor: color }"
            >
              <!-- Dynamically updated colors -->
            </div>
          </div>
        </div>

        <!-- Pegs Grid -->
        <div 
          class="basis-1/4 grid grid-cols-4 gap-2 border-2 border-gray-300 rounded-lg p-2 bg-gray-100"
        >
          <div 
            v-for="(peg, index) in 28" 
            :key="'peg-' + index" 
            class="w-6 h-6 rounded-full border border-black bg-white"
          >
            <!-- Pegs grid -->
          </div>
        </div>
      </div>

      <!-- Buttons for Selecting Colors -->
      <div class="grid grid-cols-4 gap-4 mt-4">
        <button 
          v-for="(color, index) in availableColors" 
          :key="'button-' + index" 
          class="w-10 h-10 rounded-full shadow-md focus:outline-none hover:ring-2 hover:ring-gray-500 transition"
          :style="{ backgroundColor: color }"
          @click="addColorToGrid(color)"
        >
          <!-- Color buttons -->
        </button>
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

// Available colors (8 colors)
const availableColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];

// Initialize a 4x7 grid with white cells
const colorGrid = ref(Array(28).fill('white'));

// Handle the emitted event
const onCharacterSelected = (character) => {
  selectedCharacter.value = character;
  console.log(selectedCharacter.value);
};

// Add selected color to the grid (left-to-right behavior)
const addColorToGrid = (color) => {
  // Find the first empty cell (white) starting from the top-left
  for (let i = 0; i < colorGrid.value.length; i++) {
    if (colorGrid.value[i] === 'white') {
      colorGrid.value[i] = color;
      break;
    }
  }
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
