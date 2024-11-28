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
import { ref, reactive, onMounted, onUnmounted } from "vue";
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
const errorMessage = ref("");
const secretCode = ref([]); // Updated to an array for the secret combination
const selectedCharacter = ref(null);
const ready = ref(false);

// Energy points
const maxEnergyPoints = 20;
const energyPoints = ref(3);

// Gameboard
const colorGrid = ref(Array(ROW_SIZE * TOTAL_ROWS).fill("white"));
const pegsGrid = ref(Array(ROW_SIZE * TOTAL_ROWS).fill("white"));
const currentRow = ref(0);

const socket = io("http://localhost:4000");

// Handle character selection
const handleCharacterSelection = (character) => {
  selectedCharacter.value = character;
};

// Deduct energy points
const deductEnergyPoints = (pointsToDeduct) => {
  energyPoints.value = Math.max(energyPoints.value - pointsToDeduct, 0);
};

// Add energy points
const addEnergyPoints = (pointsToAdd) => {
  energyPoints.value = Math.min(energyPoints.value + pointsToAdd, maxEnergyPoints);
};

// Check row match
const checkRowMatch = () => {
  const start = currentRow.value * ROW_SIZE;
  const end = start + ROW_SIZE;
  const rowColors = colorGrid.value.slice(start, end);
  const feedbackPegs = Array(ROW_SIZE).fill(null);

  const secret = [...secretCode.value];
  const player = [...rowColors];

  // Correct colors and positions
  player.forEach((color, index) => {
    if (color === secret[index]) {
      feedbackPegs[index] = "green";
      secret[index] = null;
      player[index] = null;
      addEnergyPoints(1);
    }
  });

  // Correct colors but wrong positions
  player.forEach((color, index) => {
    if (color && secret.includes(color)) {
      feedbackPegs[index] = "grey";
      secret[secret.indexOf(color)] = null;
    }
  });

  // Update pegs grid
  feedbackPegs.forEach((peg, i) => {
    pegsGrid.value[start + i] = peg || "white";
  });

  // Win condition
  if (feedbackPegs.every((peg) => peg === "green")) {
    alert("You win!");
    return;
  }

  // Move to next row or lose
  currentRow.value++;
  if (currentRow.value >= TOTAL_ROWS) {
    alert("You lose!");
  }
};

// Mark as ready
const markReady = () => {
  if (selectedCharacter.value) {
    ready.value = true;
    socket.emit("playerReady", { matchId: matchId.value, characterId: selectedCharacter.value.id });
  }
};

// Socket logic
onMounted(() => {
  const route = useRoute();
  matchId.value = route.params.id;

  socket.emit("joinMatch", matchId.value);

  socket.on("playerJoined", ({ players }) => {
    console.log(`Players in match:`, players);
  });

  socket.on("bothPlayersReady", (data) => {
    secretCode.value = data.code;
    loading.value = false;

    let timer = 3;
    countdown.value = timer;
    const interval = setInterval(() => {
      countdown.value = --timer;
      if (timer <= 0) {
        clearInterval(interval);
        gameStarted.value = true;
      }
    }, 1000);
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

onUnmounted(() => {
  socket.disconnect();
});
</script>
