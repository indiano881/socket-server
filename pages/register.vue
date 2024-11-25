<template>
  <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 border border-gray-300 space-y-6">
    <h1 class="text-3xl font-bold text-center text-gray-800">Register</h1>
    
    <form @submit.prevent="signUp" class="space-y-4">
      <div>
        <label for="userName" class="block text-gray-700 font-medium">Username</label>
        <input
          id="userName"
          v-model="userName"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
          required
        />
      </div>
      
      <div>
        <label for="email" class="block text-gray-700 font-medium">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label for="password" class="block text-gray-700 font-medium">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Create a password"
          required
        />
      </div>

      <button @click="signUp"
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 font-semibold"
      >
        Register
      </button>

      <div v-if="succesMsg" class="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
        {{ succesMsg }}
      </div>

      <div v-if="errorMsg" class="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
        {{ errorMsg }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const email = useState<string | null>(() => null)
const password = useState<string | null>(() => null)
const userName = useState<string | null>(() => null)
const succesMsg = useState<string | boolean>(() => false)
const errorMsg = useState<string | boolean>(() => false)

if (user.value) navigateTo('/')

const signUp = async () => {
  try {
    // Step 1: Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.value!,
      password: password.value!,
      options: {
        data: {
          full_name: userName.value,
        },
        emailRedirectTo: 'http://localhost:3000/', // Change this for deployment
      },
    })

    if (authError) {
      succesMsg.value = false
      errorMsg.value = authError.message
      return
    }

    // Step 2: Insert the new user into the 'users' table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id, // Use the user's ID from Supabase Auth
          email: email.value,
          user_name: userName.value,
          created_at: new Date(), // Optional, depending on your schema
        },
      ])

    if (userError) {
      succesMsg.value = false
      errorMsg.value = userError.message
      return
    }

    // Step 3: Success message and redirect
    errorMsg.value = false
    succesMsg.value = 'Registration successful, redirecting...'

    setTimeout(async () => {
      succesMsg.value = false
      await navigateTo('/multiplayer')
    }, 2000)
  } catch (err) {
    console.error('Unexpected error:', err)
    errorMsg.value = 'An unexpected error occurred. Please try again.'
  }
}
</script>
