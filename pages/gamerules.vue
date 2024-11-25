<template>
  <div class="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6 my-4 border-4 border-greynav">
    <!-- Toggle Button -->
    <div class="text-center">
      <button 
        class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        @click="toggleView"
      >
        {{ showGameRules ? 'View Characters' : 'View Game Rules' }}
      </button>
    </div>

    <!-- Conditionally Render Components -->
    <div v-if="showGameRules">
      <GameRulesSection />
    </div>
    <div v-else>
      <CharactersCardsContainer />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import GameRulesSection from '@/components/GameRulesSection.vue'; // Adjust the path to your actual file structure
import CharactersCardsContainer from '@/components/CharactersCardsContainer.vue'; // Adjust the path to your actual file structure

export default {
  name: 'GameRulesPage',
  components: { GameRulesSection, CharactersCardsContainer },
  setup() {
    // Reactive variable to toggle views
    const showGameRules = ref(true);

    // Function to toggle the view
    const toggleView = () => {
      showGameRules.value = !showGameRules.value;
    };

    return {
      showGameRules,
      toggleView,
    };
  },
};
</script>
