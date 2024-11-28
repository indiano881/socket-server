<template>
    <div class="flex justify-center space-x-2 mt-4">
      <div 
        v-for="(color, index) in secretCombination" 
        :key="'secret-' + index" 
        class="w-10 h-10 rounded-full"
        :style="{ backgroundColor: color }"
      ></div>
    </div>
  </template>
  
  <script setup>
  import { PropType } from "vue";
  
  // Define props
  defineProps({
    secretCombination: {
      type: Array, // Array of strings representing colors
      required: true, // Ensure this prop is passed
    },
  });
  </script>
  
  <style scoped>
  /* Add any specific styling if necessary */
  </style>
  