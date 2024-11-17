<template>
    <div class="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
      <h1 class="text-4xl font-bold text-gray-800 text-center">Solo Player Mode</h1>
      
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Overview</h2>
        <p class="text-gray-600">
          The Solo Player Mode in Nuxtermind is designed for those who want to challenge themselves without the pressure of competition. Take your time, hone your skills, and develop strategies to become a master codebreaker.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Gameplay Rules</h2>
        <ol class="list-decimal list-inside text-gray-600 space-y-2">
          <li>Choose a difficulty level: easy, medium, or hard.</li>
          <li>Start the game and make your first guess to crack the hidden code.</li>
          <li>Receive feedback after each attempt:
            <ul class="list-disc list-inside ml-6 text-gray-500">
              <li><strong>Green peg:</strong> Right color and right position.</li>
              <li><strong>Yellow peg:</strong> Right color but wrong position.</li>
            </ul>
          </li>
          <li>Continue guessing until you either solve the code or run out of attempts.</li>
        </ol>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Hints and Power-Ups</h2>
        <p class="text-gray-600">
          If you find yourself stuck, use hints or power-ups to get additional clues. These power-ups can be earned or purchased using tokens.
        </p>
      </section>
  
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-700">Scoring and Rewards</h2>
        <p class="text-gray-600">
          Your performance is scored based on the number of attempts taken to crack the code and the difficulty level chosen. Higher scores mean more tokens and a chance to unlock new characters and abilities.
        </p>
      </section>
  
      <div class="pt-6">
        <button @click="startSoloGame" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Start Solo Game
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SoloPlayerPage',
    methods: {
      startSoloGame() {
        console.log('Solo game started!');
        // Code to start the solo game can be implemented here
      }
    }
  };
  </script>
  
  