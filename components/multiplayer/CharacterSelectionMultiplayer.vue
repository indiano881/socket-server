<script setup>
import { ref } from "vue";
import { Characters } from "@/assets/data/character.ts"; // Import your Characters
import { io } from "socket.io-client";

const emit = defineEmits(["characterSelected"]);

// Manage dropdown visibility
const showMenu = ref(false);
const selectedOption = ref({
  id: -1, // Placeholder ID
  label: "Choose Character",
  icon: null,
  description: "",
  category: "",
  powerImg1: null,
  powerImg2: null,
  powerName1: "",
  powername2: "",
});

// Add Characters to the dropdown options
const options = [
  selectedOption.value,
  ...Characters.map((character) => ({
    id: character.id,
    label: character.name,
    icon: character.image,
    description: character.description,
    category: character.category,
    powerImg1: character.powers[0]?.image,
    powerImg2: character.powers[1]?.image,
    powerName1: character.powers[0]?.name,
    powerName2: character.powers[1]?.name,
  })),
];

// Handle dropdown menu toggle
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// Handle character selection
const handleSelection = (option) => {
  selectedOption.value = option;
  showMenu.value = false;
  emit("characterSelected", option);
};

// Socket connection
const socket = io("http://localhost:4000"); // Update with your server address

// Game state
const ready = ref(false);

// Emit ready event
const handleReady = () => {
  if (selectedOption.value.id !== -1) {
    ready.value = true;
    socket.emit("playerReady", { characterId: selectedOption.value.id });
  } else {
    alert("Please select a character before marking as ready.");
  }
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="dropholder">
      <p>Select</p>
      <div class="dropdown" @click="toggleMenu">
        <p class="flex items-center">
          <img
            v-if="selectedOption.icon"
            :src="selectedOption.icon"
            alt="icon"
            class="icon-image"
            width="40px"
            height="auto"
          />
          {{ selectedOption.label }}
        </p>
      </div>
      <ul class="menu" :class="{ showMenu: showMenu }">
        <li
          v-for="option in options"
          :key="option.id"
          @click="handleSelection(option)"
          class="flex items-center"
          :class="{ 'cursor-not-allowed text-gray-400': option.id === -1 }"
        >
          <img
            v-if="option.icon"
            :src="option.icon"
            alt="icon"
            class="icon-image"
            width="40px"
            height="auto"
          />
          {{ option.label }}
        </li>
      </ul>
    </div>

    <!-- Display selected character details only if a character is selected -->
    <div
      v-if="selectedOption.id !== -1"
      class="mt-10 text-center flex flex-col items-center"
    >
      <img
        :src="selectedOption.icon"
        :alt="selectedOption.label"
        width="180px"
        height="auto"
      />
      <h2 class="text-xl text-black font-bold">{{ selectedOption.label }}</h2>
      <h2 class="text-md text-black font-bold">
        Category: {{ selectedOption.category }}
      </h2>
      <h2 class="text-sm text-black italic">{{ selectedOption.description }}</h2>

      <div class="flex gap-4 mt-6">
        <img
          v-for="(power, index) in Characters.find(
            (char) => char.id === selectedOption.id
          )?.powers.slice(0, 2)"
          :key="index"
          :src="power.image"
          :alt="power.name"
          width="60px"
          height="auto"
          class="cursor-pointer"
        />
      </div>
    </div>

    <!-- Ready Button -->
    <button
      @click="handleReady"
      :disabled="ready"
      class="mt-6 px-6 py-2 rounded text-white"
      :class="[
        ready ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
      ]"
    >
      {{ ready ? "Ready (Waiting for Opponent)" : "Ready" }}
    </button>
  </div>
</template>

<style>
.icon-image {
  margin-right: 8px;
}
.menu {
  display: none;
  background-color: #ffffff;
  border: 1px solid #ccc;
  margin-top: 8px;
  list-style-type: none;
  padding: 0;
  position: absolute;
  width: 200px;
}
.menu.showMenu {
  display: block;
}
.menu li {
  padding: 10px;
  cursor: pointer;
}
.menu li:hover {
  background-color: #f0f0f0;
}
</style>
