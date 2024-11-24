<template>
  <div class="p-4 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
   <!-- Win Modal -->
   <div 
      v-if="showWinModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 class="text-4xl font-bold text-green-600">You Win!</h1>
        <p class="text-xl mt-4">Time left: <span class="font-bold">{{ gameCountdown }} seconds</span></p>
        <button 
          class="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600"
          @click="restartGame"
        >
          Play Again
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
        <div class="flex justify-center space-x-2 mt-4">
          <div 
            v-for="(color, index) in secretCombination" 
            :key="'secret-' + index" 
            class="w-10 h-10 rounded-full"
            :style="{ backgroundColor: color }"
          ></div>
        </div>
        <button 
          class="bg-red-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-red-600"
          @click="restartGame"
        >
          Try Again
        </button>
      </div>
    </div>

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
            v-for="(peg, index) in pegsGrid" 
            :key="'peg-' + index" 
            class="w-6 h-6 rounded-full border border-black"
            :style="{ backgroundColor: peg }"
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

<!-- Character Power Buttons -->
<div v-if="selectedCharacter" class="flex flex-col items-center space-y-4 mt-4">
  <!-- Power 1 Button -->
  <button 
    v-if="selectedCharacter.powerImg1" 
    :disabled="points < 3" 
    :class="{ 'grayscale': points < 3 }"
    class="flex items-center justify-center w-32 h-32 bg-gray-200 border-2 border-black rounded-lg shadow-md hover:bg-gray-300 transition"
    @click="applyPower(selectedCharacter.powerImg1)"
  >
    <img 
      :src="selectedCharacter.powerImg1" 
      alt="Power 1"
      class="w-24 h-24"
    />
  </button>
  
  <!-- Power 2 Button -->
  <button 
    v-if="selectedCharacter.powerImg2" 
    :disabled="points < 5" 
    :class="{ 'grayscale': points < 5 }"
    class="flex items-center justify-center w-32 h-32 bg-gray-200 border-2 border-black rounded-lg shadow-md hover:bg-gray-300 transition"
    @click="applyPower(selectedCharacter.powerImg2)"
  >
    <img 
      :src="selectedCharacter.powerImg2" 
      alt="Power 2"
      class="w-24 h-24"
    />
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
const showWinModal = ref(false); // Controls the win modal visibility
const showLoseModal = ref(false); // Controls the lose modal visibility
const countdown = ref(3); // Pre-game countdown
const gameCountdown = ref(100); // In-game countdown
const progress = ref(100); // Progress bar width
const points = ref(0); // Track player points (starts at 0)
let timerInterval; // Timer interval reference

// Available colors (8 colors)
const availableColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];

// Initialize a 4x7 grid with white cells
const colorGrid = ref(Array(28).fill('white'));
const pegsGrid = ref(Array(28).fill('white')); // Feedback pegs (green, grey, or white)
const currentRow = ref(0); // Track the current row (0-6)
const secretCombination = ref([]); // Secret combination of 4 colors

// Generate a random secret combination
const generateSecretCombination = () => {
  secretCombination.value = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    secretCombination.value.push(availableColors[randomIndex]);
  }
  console.log("Secret Combination:", secretCombination.value);
};

// Check if the current row matches the secret combination
const checkRowMatch = () => {
  const start = currentRow.value * 4;
  const end = start + 4;
  const rowColors = colorGrid.value.slice(start, end);
  const feedbackPegs = Array(4).fill(null); // Initialize feedback for the current row

  // Create copies for matching
  const secret = [...secretCombination.value];
  const player = [...rowColors];

  // Check for correct colors in the correct position (green pegs)
  player.forEach((color, index) => {
    if (color === secret[index]) {
      feedbackPegs[index] = 'green'; // Correct color and position
      secret[index] = null; // Remove from matching pool
      player[index] = null; // Mark as matched
      points.value += 1; // Increase points for each green peg
    }
  });

  // Check for correct colors in the wrong position (grey pegs)
  player.forEach((color, playerIndex) => {
    if (color && secret.includes(color)) {
      const secretIndex = secret.indexOf(color);
      feedbackPegs[playerIndex] = 'grey'; // Correct color, wrong position
      secret[secretIndex] = null; // Remove from matching pool
    }
  });

  // Fill feedback pegs into the pegs grid
  for (let i = 0; i < 4; i++) {
    const pegIndex = start + i;
    pegsGrid.value[pegIndex] = feedbackPegs[i] || 'white'; // Default to white if no feedback
  }

  // Check if all pegs in this row are green (win condition)
  if (feedbackPegs.every((peg) => peg === 'green')) {
    clearInterval(timerInterval); // Stop the timer
    showWinModal.value = true; // Show the win modal
    return;
  }

  // Move to the next row or trigger loss if out of attempts
  currentRow.value += 1;
  if (currentRow.value >= 7) {
    handleLoss();
  }
};

// Handle loss scenarios
const handleLoss = () => {
  clearInterval(timerInterval); // Stop the timer
  showLoseModal.value = true; // Show the lose modal
};

// Restart the game
const restartGame = () => {
  colorGrid.value = Array(28).fill('white');
  pegsGrid.value = Array(28).fill('white');
  currentRow.value = 0;
  isGameStarted.value = false;
  showWinModal.value = false;
  showLoseModal.value = false;
  gameCountdown.value = 100;
  countdown.value = 3;
  selectedCharacter.value = null; // Reset the selected character
  generateSecretCombination();
};

// Add selected color to the grid (left-to-right behavior)
const addColorToGrid = (color) => {
  const start = currentRow.value * 4;
  const end = start + 4;

  for (let i = start; i < end; i++) {
    if (colorGrid.value[i] === 'white') {
      colorGrid.value[i] = color;
      if (i === end - 1) {
        checkRowMatch();
      }
      break;
    }
  }
};

// Handle the emitted event
const onCharacterSelected = (character) => {
  selectedCharacter.value = character;
  console.log(character.powerImg1)
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
      generateSecretCombination();
      startGameCountdown();
    }
  }, 1000);
};

// Start the in-game countdown and manage the progress bar
const startGameCountdown = () => {
  const totalGameTime = 230;
  timerInterval = setInterval(() => {
    gameCountdown.value -= 1;
    progress.value = (gameCountdown.value / totalGameTime) * 100;
    if (gameCountdown.value <= 0) {
      clearInterval(timerInterval);
      handleLoss(); // Trigger loss if time runs out
    }
  }, 1000);
};

// Apply a power based on the provided image
const applyPower = (powerImage) => {
  if (powerImage === selectedCharacter.value.powerImg1) {
    // Power 1: Add 5 seconds
    gameCountdown.value = Math.min(gameCountdown.value + 5, 230); // Cap at the maximum game time
    console.log("Power 1 activated! Added 5 seconds.");
  } else if (powerImage === selectedCharacter.value.powerImg2) {
    // Power 2: Add 15 seconds
    gameCountdown.value = Math.min(gameCountdown.value + 15, 230); // Cap at the maximum game time
    console.log("Power 2 activated! Added 15 seconds.");
  } else {
    console.warn("Unknown power activated.");
  }
};

</script>
<style>
.grayscale {
  filter: grayscale(100%);
  pointer-events: none; /* Prevent hover effects when disabled */
}
</style>