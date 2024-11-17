<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4 my-4 border-4 border-greynav">
    <h1 class="text-3xl font-bold text-gray-800">What is Nuxtermind?</h1>
    <p class="text-gray-600">
      Nuxtermind is a modern twist on the classic Mastermind game, reimagined for the digital age with enhanced gameplay and interactive features.
    </p>
    
    <div class="space-y-2">
      <h2 class="text-2xl font-semibold text-gray-700">Key Features</h2>
      <ul class="list-disc list-inside text-gray-600">
        <li>Real-Time Multiplayer Gameplay: Compete against friends or challenge players worldwide.</li>
        <li>Unique Characters with special abilities.</li>
        <li>Tournament Mode to climb the ranks and win rewards.</li>
        <li>Earn game tokens through victories.</li>
        <li>Customizable game rules and cross-platform support.</li>
      </ul>
    </div>

    <div class="space-y-2">
      <h2 class="text-2xl font-semibold text-gray-700">How to Play?</h2>
      <ol class="list-decimal list-inside text-gray-600">
        <li>Pick your character with unique powers.</li>
        <li>Enter the code arena and start guessing.</li>
        <li>Receive feedback with each attempt to get closer to cracking the code.</li>
        <li>Win tokens for victories and use them for upgrades.</li>
      </ol>
    </div>

    <div class="pt-4">
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Play Now
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhatIsNuxtermind'
};
</script>

<style scoped>
/* Add any additional scoped CSS here if needed */
</style>
