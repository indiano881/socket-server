<template>
    <div class="p-8 max-w-5xl mx-auto bg-white space-y-6 my-4 ">
      <h1 class="text-4xl font-bold text-gray-900 text-center">Game Rules</h1>
      
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">Objective of the Game</h2>
        <p class="text-gray-700">
          The objective of Nuxtermind is to correctly guess the hidden code within a limited number of attempts. Use logic and strategy to decode the secret combination and outsmart your opponents.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">How to Play</h2>
        <ol class="list-decimal list-inside text-gray-700 space-y-2">
          <li>Choose your character, each with unique abilities that can aid in the gameplay.</li>
          <li>Enter the code-breaking arena and make your first guess.</li>
          <li>Receive feedback for each attempt to indicate how close you are to the correct code:
            <ul class="list-disc list-inside ml-6 text-gray-700">
              <li><strong>Right color, right position:</strong> Shows the number of pegs that are exactly correct.</li>
              <li><strong>Right color, wrong position:</strong> Shows the number of pegs with the right color but placed incorrectly.</li>
            </ul>
          </li>
          <li>Continue guessing and refining your strategy until you crack the code or run out of attempts.</li>
        </ol>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">Winning Conditions</h2>
        <p class="text-gray-700">
          You win the game if you guess the code within the allowed number of attempts. Victory earns you tokens and boosts your ranking in tournament modes.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">Special Abilities and Power-Ups</h2>
        <p class="text-gray-700">
          Each character comes with unique power-ups that can be used strategically during gameplay to gain an advantage. Choose your character wisely to suit your playing style and maximize your chances of winning.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">Tournament Rules</h2>
        <p class="text-gray-700">
          In tournament mode, players compete in consecutive rounds, and points are awarded based on performance. The player with the highest cumulative points at the end of all rounds wins the tournament.
        </p>
      </section>
  
      <div class="pt-6 flex flex-col items-center">
      <NuxtLink href="/soloplayer/gamesolo" class="bg-blue-500 text-white text-xl px-8 py-4 rounded-lg hover:bg-blue-600 transition duration-300 border-2 border-black text-center md:text-4xl md:w-[70%]">
        Start Solo Game
      </NuxtLink>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameRulesSection'
  };
  </script>