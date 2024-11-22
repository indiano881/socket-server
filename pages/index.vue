<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4 my-4 border-4 border-greynav">
    <Gameboard />
    <h1 class="text-3xl font-bold text-gray-900">What is Nu<span class="text-green-500">x</span><span class="text-yellow-500">t</span><span class="text-blue-500">e</span>rmind?</h1>
    <p class="text-gray-800">
      Nuxtermind is a modern twist on the classic Mastermind game, reimagined for the digital age with enhanced gameplay and interactive features.
    </p>
    
    <div class="space-y-2">
      <h2 class="text-2xl font-semibold text-gray-900">Key Features</h2>
      <ul class="list-disc list-inside text-gray-800">
        <li>Real-Time Multiplayer Gameplay: Compete against friends or challenge players worldwide.</li>
        <li>Unique Characters with special abilities.</li>
        <li>Tournament Mode to climb the ranks and win rewards.</li>
        <li>Win tokens for victories and use them for upgrades.</li>
      </ul>
    </div>

    <div class="flex flex-col pt-4 items-center">
      <NuxtLink href="/multiplayer" class="flex justify-center bg-green-500 text-white text-4xl px-8 py-4 rounded-lg hover:bg-green-600 transition duration-300 border-2 border-black md:w-[70%]">
        Play Now
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhatIsNuxtermind'
};
</script>

