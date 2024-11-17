<template>
    <div class="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
      <h1 class="text-4xl font-bold text-gray-800 text-center">Multiplayer Mode</h1>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Overview</h2>
        <p class="text-gray-600">
          The Multiplayer Mode in Nuxtermind offers an exhilarating experience as you compete against friends or players from around the world. Test your code-breaking skills in real-time and see who emerges as the master strategist.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Gameplay Rules</h2>
        <ol class="list-decimal list-inside text-gray-600 space-y-2">
          <li>Choose your character, each with unique abilities that can be leveraged during the game.</li>
          <li>Join or create a game room to invite friends or match with random players.</li>
          <li>Take turns making guesses to crack the code while receiving feedback after each attempt:
            <ul class="list-disc list-inside ml-6 text-gray-500">
              <li><strong>Green peg:</strong> Right color and right position.</li>
              <li><strong>Yellow peg:</strong> Right color but wrong position.</li>
            </ul>
          </li>
          <li>The first player to correctly guess the code wins the round.</li>
        </ol>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Ranking and Scoring</h2>
        <p class="text-gray-600">
          Each multiplayer game contributes to your overall ranking. Points are awarded based on your performance and victories, pushing you up the leaderboard and unlocking rewards.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Tournament Mode</h2>
        <p class="text-gray-600">
          Participate in special tournament matches where you compete in consecutive rounds. The player with the most cumulative points at the end of the tournament is declared the winner and receives exclusive prizes.
        </p>
      </section>
  
      <div class="pt-6">
        <button @click="startMultiplayerGame" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Join Multiplayer Game
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MultiplayerPage',
    methods: {
      startMultiplayerGame() {
        console.log('Multiplayer game started!');
        // Code to start the multiplayer game can be implemented here
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional scoped CSS if needed */
  </style>
  