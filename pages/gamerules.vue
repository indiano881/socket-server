<template>
    <div class="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
      <h1 class="text-4xl font-bold text-gray-800 text-center">Game Rules</h1>
      
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Objective of the Game</h2>
        <p class="text-gray-600">
          The objective of Nuxtermind is to correctly guess the hidden code within a limited number of attempts. Use logic and strategy to decode the secret combination and outsmart your opponents.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">How to Play</h2>
        <ol class="list-decimal list-inside text-gray-600 space-y-2">
          <li>Choose your character, each with unique abilities that can aid in the gameplay.</li>
          <li>Enter the code-breaking arena and make your first guess.</li>
          <li>Receive feedback for each attempt to indicate how close you are to the correct code:
            <ul class="list-disc list-inside ml-6 text-gray-500">
              <li><strong>Right color, right position:</strong> Shows the number of pegs that are exactly correct.</li>
              <li><strong>Right color, wrong position:</strong> Shows the number of pegs with the right color but placed incorrectly.</li>
            </ul>
          </li>
          <li>Continue guessing and refining your strategy until you crack the code or run out of attempts.</li>
        </ol>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Winning Conditions</h2>
        <p class="text-gray-600">
          You win the game if you guess the code within the allowed number of attempts. Victory earns you tokens and boosts your ranking in tournament modes.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Special Abilities and Power-Ups</h2>
        <p class="text-gray-600">
          Each character comes with unique power-ups that can be used strategically during gameplay to gain an advantage. Choose your character wisely to suit your playing style and maximize your chances of winning.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Tournament Rules</h2>
        <p class="text-gray-600">
          In tournament mode, players compete in consecutive rounds, and points are awarded based on performance. The player with the highest cumulative points at the end of all rounds wins the tournament.
        </p>
      </section>
  
      <div class="pt-6">
        <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Start Playing
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameRulesPage'
  };
  </script>
  
  <style scoped>
  /* Add any additional scoped CSS if needed */
  </style>
  