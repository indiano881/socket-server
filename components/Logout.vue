<template>
    <div>
        <button @click="logOut" class=" bg-yellow-500 n1 text-black hover:bg-yellow-600 transition duration-300 font font-semibold rounded-xl border-2 border-white px-2">Log Out</button>
        
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