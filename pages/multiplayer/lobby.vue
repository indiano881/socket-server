<template>
  <div class="tournament px-4 py-8 max-w-5xl mx-auto">
    <h1 class="text-4xl font-bold mb-6 text-center text-white">Game Modes</h1>
    <p class="text-gray-900 text-center mb-8 text-lg">
      Select a mode to compete with other players!
    </p>

    <!-- Game Mode Selection -->
    <div class="flex items-center justify-evenly mb-12">
      <div
        class="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition"
      >
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">1 vs 1</h2>
        <p class="text-gray-600 mb-6">
          Challenge another player to a quick match.
        </p>
        <button
          @click="registerMatch"
          class="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
        >
          Create Match
        </button>
      </div>
    </div>

    <!-- Display All Matches -->
    <div v-if="matches.length" class="matches-list bg-gray-100 p-6 rounded-lg shadow-md mt-8">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">
        All Matches
      </h2>
      <ul>
        <li
          v-for="match in matches"
          :key="match.id"
          class="match-item border-b border-gray-300 py-2"
        >
          <p><strong>ID:</strong> {{ match.id }}</p>
          <p><strong>Creator ID:</strong> {{ match.creator_id }}</p>
          <p><strong>Created At:</strong> {{ match.created_at }}</p>
        </li>
      </ul>
    </div>
    <div v-else class="text-center text-gray-600">
      No matches created yet.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth', // Specify the middleware name
})

// Supabase client and user hooks
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Reactive state for all matches
const matches = ref([])

// Fetch all matches from the database
const fetchMatches = async () => {
  try {
    const { data, error } = await supabase
      .from('gametable')
      .select('*')
      .order('created_at', { ascending: false }) // Optional: Order by latest first

    if (error) {
      console.error('Error fetching matches:', error)
      return
    }

    matches.value = data || []
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Add a new match and refetch all matches
const registerMatch = async () => {
  try {
    if (!user?.value) {
      alert('User not logged in')
      return
    }

    // Insert a new match into the 'gametable' table
    const { error } = await supabase
      .from('gametable')
      .insert([
        {
          creator_id: user.value.id, // Use the authenticated user's ID
          created_at: new Date(), // Use the current timestamp
        },
      ])

    if (error) {
      console.error('Error inserting match:', error)
      alert('Failed to create match.')
      return
    }

    // Refetch matches after adding a new one
    await fetchMatches()

    alert('Match created successfully!')
  } catch (error) {
    console.error('Unexpected error:', error)
    alert('An unexpected error occurred.')
  }
}

// Fetch matches when the component is mounted
onMounted(fetchMatches)
</script>
