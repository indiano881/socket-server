<script setup>

</script>

<template>
    <div>
     <ul class="flex flex-col md:flex-row">
          <li class="p-2"><NuxtLink href="/">Home</NuxtLink></li>
          <li class="p-2"><NuxtLink href="/about">About</NuxtLink></li>
          <li class="p-2"><NuxtLink href="/colors">Colors</NuxtLink></li>
          <li class="p-2"><NuxtLink href="/textsize">Textsize</NuxtLink></li>
        </ul>
        <slot />
    </div>
</template>