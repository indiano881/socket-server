<template>
  <div>
    <NuxtLayout>
      <NuxtPage /> 
    </NuxtLayout>
    <!--DONT REMOVE IS GOOD FOR SEO AND ACCESIBILITY-->
    <NuxtRouteAnnouncer />
   
  </div>
</template>
<script setup lang="ts">

useHead({
  title: 'Mastermind 3.0',
  meta: [
    { name: 'description', content: 'Nuxtermind' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/icon.svg' } // Add your favicon here
  ]
})
useSeoMeta({
  title: 'Nuxtermind',
  ogTitle: 'Nuxtermind',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: '/public/icon.svg',
  twitterCard: 'summary_large_image',
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>