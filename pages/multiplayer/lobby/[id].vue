<template>
  <div class="game-session text-center p-5">
    <h1 class="text-4xl font-bold">Match ID: {{ matchId }}</h1>
    <p v-if="loading" class="text-lg">The game is loading...</p>
    <p v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

    <!-- Character selection -->
    <div v-if="!ready">
      <CharacterSelection @characterSelected="handleCharacterSelection" />
      <button
        @click="markReady"
        :disabled="!selectedCharacter"
        class="mt-6 px-6 py-2 rounded text-white"
        :class="[
          ready ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        ]"
      >
        {{ ready ? "Ready (Waiting for Opponent)" : "Ready" }}
      </button>
    </div>

    <!-- Countdown and game board -->
    <p v-else-if="countdown > 0" class="text-2xl font-bold">
      Game starts in: {{ countdown }}
    </p>
    <div v-else-if="gameStarted" class="game-board mt-5">
      <h2 class="text-3xl font-bold mb-4">Gameboard</h2>
      <p class="text-xl">
        Find the secret code: <strong>{{ secretCode }}</strong>
      </p>
      <div class="board grid grid-rows-6 grid-cols-4 gap-2 mt-4">
        <!-- Example board structure -->
        <div
          v-for="row in rows"
          :key="row"
          class="row flex justify-center"
        >
          <div
            v-for="cell in cols"
            :key="cell"
            class="cell w-12 h-12 border border-black flex items-center justify-center text-lg"
          >
            <!-- Each cell can later represent a part of the game -->
            ?
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-lg">Waiting for another player to join...</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import CharacterSelection from "@/components/CharacterSelection.vue"; // Import the CharacterSelection component

// Reactive variables
const matchId = ref("");
const loading = ref(true);
const countdown = ref(0); // Countdown timer
const gameStarted = ref(false);
const errorMessage = ref("");
const secretCode = ref(""); // The secret code for both players
const selectedCharacter = ref(null); // The selected character
const ready = ref(false); // Track readiness status

// Gameboard structure
const rows = 6; // Number of rows
const cols = 4; // Number of columns

const socket = io("http://localhost:4000"); // Connect to your Socket.io server

// Handle character selection
const handleCharacterSelection = (character) => {
  selectedCharacter.value = character;
};

// Mark the player as ready
const markReady = () => {
  if (selectedCharacter.value) {
    ready.value = true;
    socket.emit("playerReady", { matchId: matchId.value, characterId: selectedCharacter.value.id });
  }
};

// Extract id and set up Socket.io logic
onMounted(() => {
  const route = useRoute();
  matchId.value = route.params.id; // Extract id from the URL

  if (matchId.value) {
    // Notify the server of joining the match
    socket.emit("joinMatch", matchId.value);

    // Handle the server response when the game starts
    socket.on("startGame", (code) => {
      loading.value = false;

      // Set the secret code
      secretCode.value = code;

      // Start countdown
      let timer = 3;
      countdown.value = timer;
      const interval = setInterval(() => {
        timer -= 1;
        countdown.value = timer;

        if (timer === 0) {
          clearInterval(interval);
          gameStarted.value = true;
          countdown.value = 0;
        }
      }, 1000);
    });

    // Handle the case when the match is full
    socket.on("matchFull", () => {
      loading.value = false;
      errorMessage.value =
        "This match is already full. Please try another match.";
    });

    // Handle errors
    socket.on("invalidMatch", () => {
      loading.value = false;
      errorMessage.value = "Invalid match ID. Please check the link.";
    });
  } else {
    loading.value = false;
    errorMessage.value = "No match ID provided. Please use a valid match link.";
  }
});

// Clean up socket connection on component unmount
onUnmounted(() => {
  socket.disconnect();
});
</script>
