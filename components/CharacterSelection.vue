<script setup>
import { ref } from 'vue';
import { Characters } from '@/assets/data/character.ts'; // Import your Characters

// Manage dropdown visibility
const showMenu = ref(false);

// Toggle the menu
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// Handle option selection
const handleSelection = (option) => {
  selectedOption.value = option;
  showMenu.value = false;
};

// Default options


// Add Characters to the dropdown options
const options = [ ...Characters.map((character) => ({
  id: character.id,
  label: character.name,
  icon: character.image,
  description: character.description,
  category: character.category,
  powerImg1: character.powers[0].image,
  powerImg2: character.powers[1].image,
}))];

const selectedOption = ref(options[0]); // Default selection
// Manage modal visibility
const showModal = ref(false);
const selectedPower = ref({ name: '', description: '' });

// Open the modal with power details
const openPowerModal = (power) => {
  selectedPower.value = power;
  showModal.value = true;
};

// Close the modal
const closeModal = () => {
  showModal.value = false;
};
</script>



<template>
    <div>
    <div class="dropholder">
      <p>Select</p>
      <div class="dropdown" @click="toggleMenu">
        <p class="flex">
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
      <!-- Display selected character name -->
    
    </div>
    <div v-if="selectedOption" class="mt-10 text-center flex flex-col items-center">
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
    
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h3 class="text-lg font-bold mb-4">{{ selectedPower.name }}</h3>
        <p class="text-sm text-gray-600">{{ selectedPower.description }}</p>
        <button @click="closeModal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
  </template>
  
  <style scoped>
 
.dropholder{
    
  width: 322px;
  height: 60px;
  padding:0 0 0 20px;
  margin-bottom: 40px;
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
  box-shadow:0 15px 10px rgba(0,0,0, 0.4);
  animation: moveShadow 3s ease-in-out infinite;
}
p{
  float: left;
  line-height:60px;
}
.dropdown > p{
  font-size:16px;
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
  font-size: 18px;
  position: absolute;
  right:20px;
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
  background:#61ccfd;
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

