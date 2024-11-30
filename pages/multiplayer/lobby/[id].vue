<template>
  <div class="p-4 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
    <h1 class="text-4xl font-bold">Match ID: {{ matchId }}</h1>
    <p v-if="loading" class="text-lg">The game is loading...</p>
    <p v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

    <!-- Character Selection -->
    <div v-if="!ready && !gameStarted">
      <CharacterSelection @characterSelected="handleCharacterSelection" />
      <button
        @click="markReady"
        :disabled="!selectedCharacter"
        class="mt-6 px-6 py-2 rounded text-white"
        :class="[ready ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600']"
      >
        {{ ready ? "Ready (Waiting for Opponent)" : "Ready" }}
      </button>
    </div>

    <!-- Countdown Before Game Starts -->
    <div v-if="countdown > 0" class="flex justify-center items-center h-96">
      <h1 class="text-9xl font-bold text-yellow-400">{{ countdown }}</h1>
    </div>
<!-- Result Modal -->
<div 
      v-if="showResultModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 class="text-4xl font-bold" :class="resultMessage.includes('won') ? 'text-green-600' : 'text-red-600'">
          {{ resultMessage }}
        </h1>
        <p v-if="timeLeft" class="text-xl mt-4 text-gray-900">
          Time left: <span class="font-bold">{{ timeLeft }} seconds</span>
        </p>
        <button 
          class="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600"
          @click="showResultModal = false"
        >
          Close
        </button>
      </div>
    </div>
    <!-- Waiting for Opponent's Result -->
<div v-if="waitingForResult" class="text-center my-6">
  <p class="text-2xl font-bold text-gray-700">Waiting for the other player's result...</p>
</div>
    <!-- Gameboard -->
    <div v-else-if="gameStarted" class="game-board mt-5 flex flex-col bg-purple-300 rounded-lg shadow-md border-2 border-black">
      <!-- Game Header -->
      <div class="flex items-center justify-between px-4 py-2">
        <!-- Energy Points Display -->
        <div class="flex flex-col items-center bg-white border-2 border-black rounded-xl p-2">
          <p class="text-xl font-bold text-black">Energy</p>
          <p
            class="text-2xl font-bold"
            :class="{
              'text-green-600': energyPoints > 0,
              'text-yellow-500': energyPoints === 0
            }"
          >
            {{ energyPoints }}/{{ maxEnergyPoints }}
          </p>
        </div>

        <!-- Timer Countdown -->
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

        <!-- Character Image -->
        <img
          :src="selectedCharacter?.icon"
          :alt="selectedCharacter?.label"
          class="w-20 h-20 p-1 rounded-full border-2 border-gray-800 bg-white ml-4"
        />
      </div>

      <!-- Gameboard Content -->
      <div class="flex space-x-4 mt-4">
        <!-- Color Choices Grid -->
        <div class="grid grid-cols-4 gap-2 border-2 border-gray-300 rounded-lg p-2 bg-gray-100">
          <div
            v-for="(color, index) in colorGrid"
            :key="'color-grid-' + index"
            class="w-10 h-10 rounded-full"
            :style="{ backgroundColor: color }"
          ></div>
        </div>

        <!-- Pegs Grid -->
        <div class="grid grid-cols-4 gap-2 border-2 border-gray-300 rounded-lg p-2 bg-gray-100">
          <div
            v-for="(peg, index) in pegsGrid"
            :key="'peg-' + index"
            class="w-6 h-6 rounded-full border border-black"
            :style="{ backgroundColor: peg }"
          ></div>
        </div>
      </div>

      <!-- Buttons Container -->
      <div class="flex justify-evenly mt-4">
        <!-- Character Power Buttons -->
        <div v-if="selectedCharacter" class="flex flex-col items-center justify-around">
          <button
            v-if="selectedCharacter.powerImg1"
            :disabled="energyPoints < 3"
            :class="{ 'grayscale cursor-not-allowed': energyPoints < 3 }"
            class="flex items-center justify-center w-20 h-20 bg-white border-2 border-black rounded-full hover:bg-gray-300 transition"
            @click="applyPower(selectedCharacter.powerName1)"
          >
            <img :src="selectedCharacter.powerImg1" alt="Power 1" class="w-16 h-16" />
          </button>
          <button
            v-if="selectedCharacter.powerImg2"
            :disabled="energyPoints < 3"
            :class="{ 'grayscale cursor-not-allowed': energyPoints < 3 }"
            class="flex items-center justify-center w-20 h-20 bg-white border-2 border-black rounded-full hover:bg-gray-300 transition"
            @click="applyPower(selectedCharacter.powerName2)"
          >
            <img :src="selectedCharacter.powerImg2" alt="Power 2" class="w-16 h-16" />
          </button>
        </div>

        <!-- Buttons for Selecting Colors -->
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="(color, index) in availableColors"
            :key="'button-' + index"
            class="w-12 h-12 rounded-full shadow-md focus:outline-none hover:ring-2 hover:ring-gray-500 transition border-2 border-black"
            :style="{ backgroundColor: color }"
            @click="addColorToGrid(color)"
          ></button>
        </div>
      </div>
    </div>

    <!-- Waiting for Another Player -->
    <p v-else class="text-lg">Waiting for another player to join...</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";

// Constants for grid size
const ROW_SIZE = 4;
const TOTAL_ROWS = 7;

// Reactive variables
const matchId = ref("");
const loading = ref(true);
const countdown = ref(0);
const gameStarted = ref(false);
const gameCountdown = ref(100); // In-game countdown

const errorMessage = ref("");
const secretCombination = ref(null); // Store the secret combination
const selectedCharacter = ref(null);
const ready = ref(false);
const resultMessage = ref(""); // Message to display for victory/loss
const timeLeft = ref(null); // Time left for the winner
const showResultModal = ref(false); // Modal visibility
const waitingForResult = ref(false); // Indicates if waiting for the opponent's result

// Timer interval reference
let timerInterval = null;
// Available colors (8 colors)
const availableColors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
  "brown",
];

// Energy points
const maxEnergyPoints = 20;
const energyPoints = ref(3);

// Gameboard
const colorGrid = ref(Array(ROW_SIZE * TOTAL_ROWS).fill("white"));
const pegsGrid = ref(Array(ROW_SIZE * TOTAL_ROWS).fill("white"));
const currentRow = ref(0);

// Initialize socket connection
const socket = io("http://localhost:4000"); // Replace with your server's URL

// Handle character selection
const handleCharacterSelection = (character) => {
  selectedCharacter.value = character;
};

// Add selected color to the grid (left-to-right behavior)
const addColorToGrid = (color) => {
  const start = currentRow.value * 4;
  const end = start + 4;

  for (let i = start; i < end; i++) {
    if (colorGrid.value[i] === "white") {
      colorGrid.value[i] = color;
      if (i === end - 1) {
        checkRowMatch();
      }
      break;
    }
  }
};

// Deduct energy points
const deductEnergyPoints = (pointsToDeduct) => {
  energyPoints.value = Math.max(energyPoints.value - pointsToDeduct, 0);
};

// Add energy points
const addEnergyPoints = (pointsToAdd) => {
  energyPoints.value = Math.min(energyPoints.value + pointsToAdd, maxEnergyPoints);
};

// Handle loss
const handleLoss = () => {
  clearInterval(timerInterval); // Stop the timer
  showLoseModal.value = true; // Show the lose modal
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
      feedbackPegs[index] = "green"; // Correct color and position
      secret[index] = null; // Remove from matching pool
      player[index] = null; // Mark as matched
      energyPoints.value += 1; // Increase points for each green peg
    }
  });

  // Check for correct colors in the wrong position (grey pegs)
  player.forEach((color, playerIndex) => {
    if (color && secret.includes(color)) {
      const secretIndex = secret.indexOf(color);
      feedbackPegs[playerIndex] = "grey"; // Correct color, wrong position
      secret[secretIndex] = null; // Remove from matching pool
    }
  });

  // Fill feedback pegs into the pegs grid
  for (let i = 0; i < 4; i++) {
    const pegIndex = start + i;
    pegsGrid.value[pegIndex] = feedbackPegs[i] || "white"; // Default to white if no feedback
  }

  // Check if all pegs in this row are green (win condition)
  if (feedbackPegs.every((peg) => peg === "green")) {
    clearInterval(timerInterval); // Stop the timer
    //showWinModal.value = true; // Show the win modal
    emitPlayerWin(); // Notify the server
    return;
  }

  // Move to the next row or trigger loss if out of attempts
  currentRow.value += 1;
  if (currentRow.value >= 7) {
    emitPlayerLose(); // Notify the server
    //handleLoss();
  }
};

const startGameCountdown = () => {
  const totalGameTime = 100;
  gameCountdown.value = totalGameTime;

  timerInterval = setInterval(() => {
    gameCountdown.value -= 1;
    if (gameCountdown.value <= 0) {
      clearInterval(timerInterval); // Stop the timer when it reaches 0
      handleLoss(); // Handle game loss when the timer ends
    }
  }, 1000); // Decrease every second
};

// Mark as ready
const markReady = () => {
  if (selectedCharacter.value) {
    ready.value = true;
    socket.emit("playerReady", {
      matchId: matchId.value,
      characterId: selectedCharacter.value.id,
    });
  }
};

// Watch for changes in secretCombination
watch(secretCombination, (newValue) => {
  console.log("secretCombination updated:", newValue);
});

// Lifecycle Hooks
onMounted(() => {
  const route = useRoute();
  matchId.value = route.params.id;

  socket.emit("joinMatch", matchId.value);

  socket.on("secretCombination", (data) => {
    console.log("Received secret combination:", data.secretCombination);
    secretCombination.value = data.secretCombination;
  });

  socket.on("playerJoined", ({ players }) => {
    console.log(`Players in match:`, players);
  });

  socket.on("bothPlayersReady", (data) => {
  console.log(data);
  if (data) {
    secretCombination.value = data;
    loading.value = false;
    console.log(secretCombination.value);

    // Pre-game countdown
    let timer = 3;
    countdown.value = timer;
    const interval = setInterval(() => {
      countdown.value = --timer;
      if (timer <= 0) {
        clearInterval(interval);
        gameStarted.value = true;

        // Start the in-game countdown when the game starts
        startGameCountdown();
      }
    }, 1000);
  }
});

  socket.on("matchFull", () => {
    errorMessage.value = "This match is already full.";
  });

  socket.on("invalidMatch", () => {
    errorMessage.value = "Invalid match ID.";
  });

  socket.on("opponentLeft", () => {
    errorMessage.value = "Your opponent left the match.";
    ready.value = false;
  });
});
// Emit when the player wins

// Emit when the player finishes
const emitPlayerFinished = () => {
  waitingForResult.value = true; // Show waiting message
};
// Emit when the player wins
const emitPlayerWin = () => {
  const timeLeft = gameCountdown.value; // Remaining time
  emitPlayerFinished(); // Notify the frontend to show the waiting message
  socket.emit("playerWin", {
    matchId: matchId.value,
    timeLeft,
  });
};
// Emit when the player loses
const emitPlayerLose = () => {
  emitPlayerFinished(); // Notify the frontend to show the waiting message
  socket.emit("playerLose", {
    matchId: matchId.value,
  });
};

// Listen for the game result from the server
socket.on("gameResult", (result) => {
  console.log("Game result received:", result); // Debugging
  waitingForResult.value = false; // Stop showing the waiting message
  if (result.winnerId === socket.id) {
    resultMessage.value = `You won! Time left: ${result.timeLeft} seconds`;
    showResultModal.value = true; // Show the result modal
  } else {
    resultMessage.value = `You lost. Opponent had ${result.timeLeft} seconds left.`;
    showResultModal.value = true; // Show the result modal
  }
});
onUnmounted(() => {
  socket.disconnect();
});
</script>

