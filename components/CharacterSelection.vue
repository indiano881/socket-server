<script setup>
import { ref } from 'vue';
import { Characters } from '@/assets/data/character.ts'; // Import your Characters

const emit = defineEmits(['characterSelected']);
// Manage dropdown visibility
const showMenu = ref(false);

// Toggle the menu
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// Add Characters to the dropdown options
const options = [
  {
    id: -1, // Placeholder ID
    label: 'Choose Character',
    icon: null, // No image for placeholder
    description: '',
    category: '',
    powerImg1: null,
    powerImg2: null,
  },
  ...Characters.map((character) => ({
    id: character.id,
    label: character.name,
    icon: character.image,
    description: character.description,
    category: character.category,
    powerImg1: character.powers[0]?.image,
    powerImg2: character.powers[1]?.image,
  })),
];

// Default selection is the placeholder
const selectedOption = ref(options[0]);

// Handle option selection
const handleSelection = (option) => {
  selectedOption.value = option;
  showMenu.value = false;

  emit('characterSelected', option);
};

// Game states
const isCountdownRunning = ref(false);
const isGameStarted = ref(false);
const countdown = ref(3); // Pre-game countdown
const gameCountdown = ref(100); // In-game countdown
const progress = ref(100); // Progress bar width
let timerInterval; // Timer interval reference

// Start the pre-game countdown
const startCountdown = () => {
  if (selectedOption.value.id === -1) {
    alert('Please select a character to start the game!');
    return;
  }

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
      alert('Time is up! You lost the game!');
    }
  }, 1000);
};

// Generate a random secret combination
const availableColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
const secretCombination = ref([]);

const generateSecretCombination = () => {
  secretCombination.value = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    secretCombination.value.push(availableColors[randomIndex]);
  }
  console.log("Secret Combination:", secretCombination.value);
};

// Manage modal visibility
const showModal = ref(false);
const selectedPower = ref({ name: '', description: '' });

const openPowerModal = (power) => {
  selectedPower.value = power;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
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
    <div v-if="selectedOption.id !== -1" class="mt-10 text-center flex flex-col items-center">
      <img :src="selectedOption.icon" :alt="selectedOption.label" width="180px" height="auto" />
      <h2 class="text-xl text-black font-bold">{{ selectedOption.label }}</h2>
      <h2 class="text-md text-black font-bold">Category: {{ selectedOption.category }}</h2>
      <h2 class="text-sm text-black italic">{{ selectedOption.description }}</h2>

      <div class="flex gap-4 mt-6">
        <img 
          v-for="(power, index) in Characters.find(char => char.id === selectedOption.id)?.powers.slice(0, 2)" 
          :key="index" 
          :src="power.image" 
          :alt="power.name" 
          width="60px" 
          height="auto" 
          class="cursor-pointer" 
          @click="openPowerModal(power)" 
        />
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h3 class="text-lg font-bold mb-2">{{ selectedPower.name }}</h3>
        <p class="text-sm text-gray-900">{{ selectedPower.description }}</p>
        <button @click="closeModal" class="mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

  
  <style scoped>
 
.dropholder{
  width: 322px;
  height: 60px;
  padding:0 0 0 20px;
  margin-bottom: 10px;
  border-radius:10px;
  font:18px arial;
  color: #fff;
  position: relative;
  box-sizing:border-box;
  border:1px solid #c444de;
  animation: move 3s ease-in-out infinite;
  position: relative;
}
.dropholder:hover, .dropholder:hover:after{
  animation-play-state:paused;
}
.dropholder:after{
  content:"";
  position: absolute;
  width: 250px;
  height: 5px;
  background:rgba(0,0,0, 0);
  display: block;
  top:100px;
  left:37px;
  margin: auto;
  border-radius:50%;
  animation: moveShadow 3s ease-in-out infinite;
}
p{
  float: left;
  line-height:60px;
}
.dropdown > p{
  font-size:20px;
}
.dropdown, .dropholder{
  background:linear-gradient(#b314d6 ,#470255);
}
.dropdown{
  margin-left:20px;
  float: left;
  width: 208px;
  padding:0 0 0 20px;
  border-radius:0 10px 10px 0;
  cursor: pointer;
  height:58px;
  border-left:1px solid #da4df8;
  position: relative;
}
.dropdown:hover{
  background:linear-gradient(#da4df8 ,#b11cd0);
}
.dropdown:after{
  content:"▾";
  font-size: 22px;
  position: absolute;
  right:6px;
  top:18px;
  display: block;
}

.menu{
  position: absolute;
  right:0;
  top:70px;
  width: 228px;
  cursor: pointer;
  opacity:0;
  transform-style: preserve-3d;
  transform:rotatey(180deg) rotateX(5deg) translatey(100px);
  backface-visibility: hidden;
  background:linear-gradient(#b314d6 ,#470255);
  border:2px solid #0d82b9;
  border-radius:10px;
  transition:all 0.8s;
  z-index:5;
  overflow:hidden;
}
.menu li{
  padding: 10px 10px;
  border-bottom:1px dotted #fff;
  color:#e8f8ff; 
  transition:all 0.3s;
}
.menu li:hover{
  background:#6efd61;
  color: black;
  padding-left:20px;
}
.menu li:last-child{
  border:none;
}

.showMenu{
   opacity:1;
  transform:rotateX(0deg) translatey(0px);
}
li > i{
  float: left;
  padding-top: 3px;
  padding-right: 8px;
}
p > i{
 position: relative;
 top:2px;
}
i{
  opacity: 0.7;
}
@keyframes move{
  0%, 100%{transform:translateY(-10px);}
  50%{transform:translateY(0);}
}

@keyframes moveShadow{
  0%,100%{transform:translateY(10px);opacity:0.4;}
  50%{transform:translateY(0);opacity:1;}
}



  </style>

