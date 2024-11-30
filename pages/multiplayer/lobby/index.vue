<template>
    <div class="tournament px-4 py-8 max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold mb-6 text-center text-white">Game Modes</h1>
      <p class="text-gray-900 text-center mb-8 text-xl font-semibold">
        Select a mode to compete with other players!
      </p>
  
      <!-- Game Mode Selection -->
      <div class="flex items-center justify-evenly mb-12">
        <div
          class="p-6 bg-white rounded-xl border-2 border-greynav"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900">1 vs 1</h2>
          <p class="text-gray-700 mb-6">
            Challenge another player to a quick match.
          </p>
          <button
            @click="registerMatch"
            class="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl border-2 border-greynav"
          >
            Create Match
          </button>
        </div>
      </div>
  
      <!-- Display All Matches -->
      <div v-if="matches.length" class="flex flex-col bg-white p-6 rounded-xl border-2 border-greynav mt-8">
        <h2 class="text-2xl font-semibold text-center text-gray-900 mb-4">
          All Matches
        </h2>
        <ul>
          <li
            v-for="match in matches"
            :key="match.id"
            class=" flex flex-col bg-purple-300 border-2 border-greynav py-2 rounded-xl my-4 p-4"
          >
            <p><strong>ID:</strong> {{ match.id }}</p>
            <p><strong>Players:</strong> {{ match.player_count }}/2</p>
            <p><strong>Status:</strong> {{ match.status }}</p>
            <button
              v-if="match.player_count < 2 && match.status === 'Waiting for players'"
              @click="joinMatch(match.id)"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl border-2 border-greynav mt-2"
            >
              Join Match
            </button>
            <p v-else-if="match.status === 'In Progress'" class="text-green-600 mt-2">
              Match is in progress
            </p>
          </li>
        </ul>
      </div>
      <div v-else class="text-center text-gray-700">
        No matches created yet.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  definePageMeta({
    middleware: 'auth', // Specify the middleware name
  })
  
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const matches = ref([])
  
  const fetchMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('gametable')
        .select('*')
        .order('created_at', { ascending: false })
  
      if (error) {
        console.error('Error fetching matches:', error)
        return
      }
  
      matches.value = data || []
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }
  
  const registerMatch = async () => {
    try {
      if (!user?.value) {
        alert('User not logged in')
        return
      }
  
      const { error } = await supabase
        .from('gametable')
        .insert([
          {
            creator_id: user.value.id,
            player_count: 0,
            status: 'Waiting for players',
            created_at: new Date(),
          },
        ])
  
      if (error) {
        console.error('Error creating match:', error)
        alert('Failed to create match.')
        return
      }
  
      await fetchMatches()
      alert('Match created successfully!')
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred.')
    }
  }
  import { useRouter } from 'vue-router';

const router = useRouter(); // Initialize router instance
  const joinMatch = async (matchId) => {
  try {
    const match = matches.value.find((m) => m.id === matchId);

    if (!match || match.player_count >= 2) {
      alert('Match is full or not available.');
      return;
    }

    const { error } = await supabase
      .from('gametable')
      .update({
        player_count: match.player_count + 1,
        status: match.player_count + 1 === 2 ? 'In Progress' : 'Waiting for players',
      })
      .eq('id', matchId);

    if (error) {
      console.error('Error joining match:', error);
      alert('Failed to join match.');
      return;
    }

    // Refetch matches after joining
    await fetchMatches();

    

    // Navigate to the match-specific lobby page
    router.push(`/multiplayer/lobby/${matchId}`);
  } catch (error) {
    console.error('Unexpected error:', error);
    alert('An unexpected error occurred.');
  }
};
  
  onMounted(fetchMatches)
  </script>
  