<script setup>
const { $socket } = useNuxtApp();

const sendGuess = () => {
    $socket.emit('guess', { player: 'Player1', guess: '1234' });
};

$socket.on('newGuess', (data) => {
    console.log('New guess received:', data);
});
</script>

<template>
    <button @click="sendGuess">Send Guess</button>
</template>
