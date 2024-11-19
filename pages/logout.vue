<template>
    <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 border border-gray-300 space-y-6">
        
        <button @click="logOut" class="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600 transition duration-300 font-semibold">Log Out</button>
        
        <div v-if="succesMsg" class="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
          {{ succesMsg }}
        </div>
  
        <div v-if="errorMsg" class="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
          {{ errorMsg }}
        </div>
    </div>
    
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const logOut= async () => {
    const {error} = await supabase.auth.signOut()

    if (error) {
        errorMsg.value= error.message
        return
    }

    succesMsg.value = "Hope to see you again!!!"
    setTimeout(async()=>{
        succesMsg.value= null;
        await navigateTo("/login")
    }, 2000)


    definePageMeta( {
        middleware:
        async () => {
            const user= useSupabaseUser();
            if (!user.value) return await navigateTo("/login")
        }
    })
}
</script>