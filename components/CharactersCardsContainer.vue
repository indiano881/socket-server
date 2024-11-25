<template>
    <div class="p-8 max-w-6xl mx-auto bg-white  space-y-6 my-4 ">
      <h1 class="text-4xl font-bold text-gray-800 text-center">Character Gallery</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="character in Characters" 
          :key="character.id" 
          class="p-4 border-2 rounded-xl border-graynav"
        >
          <img :src="character.image" :alt="character.name" class="w-26 h-auto object-cover rounded-t-md mb-4">
          <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ character.name }}</h2>
          <p class="text-gray-700 mb-4">{{ character.description }}</p>
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900">Powers:</h3>
            <ul>
              <li v-for="(power, index) in character.powers" :key="index" class="mb-2 flex flex-col text-gray-700">
                <span class="text-gray-700 font-semibold">{{ power.name }}:</span>{{ power.description }}
                <img :src="power.image" :alt="power.name" class="w-12 h-auto object-cover rounded-md mt-2">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts">
import { Characters } from '@/assets/data/character'; // Ensure the path matches your project structure

  
  export default defineComponent({
    name: 'CharacterGallery',
    data() {
      return {
        Characters: Characters // Use the imported data here
      };
    }
  });
  </script>
  