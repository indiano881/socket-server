<script setup>
const { $socket } = useNuxtApp();

// Get Supabase client and authenticated user
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const sendGuess = () => {
    if (!user.value) {
        console.log('User not authenticated.');
        return;
    }

    // Emit the guess event with user details
    $socket.emit('guess', {
        playerId: user.value.id, // Supabase user ID
        playerEmail: user.value.email, // Supabase user email
        guess: '1234' // Example guess
    });
};

// Listen for incoming guesses
$socket.on('newGuess', (data) => {
    console.log('New guess received:', data);
});

// Debugging: Log the user object to ensure it's working
console.log(user);
</script>

<template>
    <div>
        <button @click="sendGuess">Send Guess</button>
    </div>
</template>
