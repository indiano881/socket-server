<template>
  <div class="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
    <h1 class="text-4xl font-bold text-gray-800 text-center">Practice mode as solo game</h1>
    <div class="pt-6 flex flex-col items-center">
      <NuxtLink href="/soloplayer/gamesolo" class="bg-blue-500 text-white text-xl px-8 py-4 rounded-lg hover:bg-blue-600 transition duration-300 border-2 border-black text-center md:text-4xl md:w-[70%]">
        Start Solo Game
      </NuxtLink>
    </div>
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-900">Overview</h2>
      <p class="text-gray-700">
        The Solo Player Mode in Nuxtermind is designed for those who want to challenge themselves without the pressure of competition. Take your time, hone your skills, and develop strategies to become a master codebreaker.
      </p>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-900">Gameplay Rules</h2>
      <ol class="list-decimal list-inside text-gray-700 space-y-2">
        <li>Choose a difficulty level: easy, medium, or hard.</li>
        <li>Start the game and make your first guess to crack the hidden code.</li>
        <li>Receive feedback after each attempt:
          <ul class="list-disc list-inside ml-6 text-gray-700">
            <li><span class="text-green-600 font-bold">Green peg:</span> Right color and right position.</li>
            <li><span class="text-gray-600 font-bold">Grey peg:</span> Right color but wrong position.</li>
          </ul>
        </li>
        <li>Continue guessing until you either solve the code or run out of attempts.</li>
      </ol>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-900">Hints and Power-Ups</h2>
      <p class="text-gray-700">
        If you find yourself stuck, use hints or power-ups to get additional clues. These power-ups can be earned or purchased using tokens.
      </p>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-900">Scoring and Rewards</h2>
      <p class="text-gray-700">
        Your performance is scored based on the number of attempts taken to crack the code and the difficulty level chosen. Higher scores mean more tokens and a chance to unlock new characters and abilities.
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
  name: 'SoloPlayerPage',
 
};
</script>

