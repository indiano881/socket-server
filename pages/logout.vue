<template>
    <div>
        <h1>log out</h1>
        <button @click="logOut">Log Out</button>
        
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
const succesMsg = useState<string | boolean>(() => false)
const errorMsg = useState<string | boolean>(() => false)

const logOut= async () => {
    const {error} = await supabase.auth.signOut()


    if (error) {
        errorMsg.value= error.message
        return
    }

    succesMsg.value = "Hope to see you again!!!"
    setTimeout(async()=>{
        succesMsg.value= null;
        await navigateTo("/")
    }, 2000)
}
</script>