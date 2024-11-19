<template>
    <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 border border-gray-300 space-y-6">
      <h1 class="text-3xl font-bold text-center text-gray-800">log in</h1>
      
      <form @submit.prevent="logIn" class="space-y-4">

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
  
        <button @click="logIn"
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 font-semibold"
        >
          Log in
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
// Initialize as empty strings to ensure they're always of type `string`
const email = ref<string>('')
const password = ref<string>('')

// Reactive variables for messages
const succesMsg = ref<string | boolean>(false)
const errorMsg = ref<string | boolean| null>(false)

if (user.value) navigateTo('/')

const logIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (error) {
        succesMsg.value = false
        errorMsg.value = error.message
        return
    }

    errorMsg.value = null
    succesMsg.value = "Welcome Back!!!"
    setTimeout(async () => {
        succesMsg.value = false
        await navigateTo('/multiplayer')
    }, 2000)
}
</script>
