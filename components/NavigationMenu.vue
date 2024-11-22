<script setup>

const user = useSupabaseUser()
const windowWidth = ref('')
const menuOpen = ref(false)
const buttonShow = ref(false)

const getWindowWidth = () => {
  windowWidth.value = window.innerWidth
  menuOpen.value = windowWidth.value >= 768
  buttonShow.value = windowWidth.value < 768
}

const closeMenu = () => {
  if (buttonShow.value) {
    menuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', getWindowWidth)
  getWindowWidth() // Ensure the initial width is set
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', getWindowWidth)
})

// Computed property to check if the user is logged in
const isLoggedIn = computed(() => user.value !== null)
</script>

<template>
  <header class="header">
    <div class="flex"> 
      <NuxtLink href="/" @click="closeMenu"><img src="/public/icon.svg" alt="Nuxtermind logo" width="40" height="auto"/></NuxtLink>
      <h1 class="header__title hidden md:block">Nu<span class="text-green-400">x</span><span class="text-yellow-400">t</span><span class="text-blue-400">e</span>rmind</h1>
    </div>
    <button
      v-show="buttonShow"
      class="menu-button"
      :class="{ open: menuOpen }"
      @click="menuOpen = !menuOpen"
    >
      <span class="menu-button__bar menu-button__bar--top"></span>
      <span class="menu-button__bar menu-button__bar--center"></span>
      <span class="menu-button__bar menu-button__bar--bottom"></span>
    </button>
    <transition name="fade">
      <nav v-show="menuOpen" class="nav" :class="{ 'sp-menu': buttonShow }">
        <ul class="flex flex-col md:flex-row">
          <li class="n1 p-2 md:pr-4"><NuxtLink href="/" @click="closeMenu">What is Nuxtermind?</NuxtLink></li>
          <li class="n1 p-2 md:pr-4"><NuxtLink href="/gamerules" @click="closeMenu">Rules</NuxtLink></li>
          <li class="n1 p-2 md:pr-4"><NuxtLink href="/soloplayer" @click="closeMenu">Practice Mode</NuxtLink></li>
          <li class="n1 p-2 md:pr-4"><NuxtLink href="/characters" @click="closeMenu">Char</NuxtLink></li> 
          <li class="n1 p-2 md:pr-4"><NuxtLink href="/multiplayer" @click="closeMenu" class="bg-green-500 border-2 border-white px-2 rounded-xl hover:bg-green-600 transition duration-300">Multiplayer</NuxtLink></li>
          <li v-if="!isLoggedIn" class="n1 p-2 md:pr-4 "><NuxtLink href="/login" @click="closeMenu" class="bg-yellow-500 border-2 border-white px-2 rounded-xl hover:bg-yellow-600 transition duration-300">Login</NuxtLink></li>
          <li v-if="!isLoggedIn" class="n1 p-2 md:pr-4"><NuxtLink href="/register" @click="closeMenu" class="bg-blue-500 border-2 text-white border-white px-2 rounded-xl hover:bg-blue-600 transition duration-300">Register</NuxtLink></li>
          <li v-if="isLoggedIn" class="n1 md:p-2 md:pr-4"><Logout /></li>
        </ul>
      </nav>
    </transition>
  </header>
</template>




<style >
.header {
  align-items: center;
  position: sticky;
  padding: 0 2rem 6px 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  @apply bg-greynav;
  color: #fefefc;
  z-index: 50;
}
img {
  margin: 0.5rem
}
.header__title {
  margin: 0;
  padding: 0.5rem;
  font-size: 1.8rem;
}

.menu-button {
  appearance: none;
  position: absolute;
  top: calc((3.8rem - 44px) / 2);
  right: 15px;
  display: inline-block;
  width: 40px;
  height: 34px;
  background: none;
  border: none;
  z-index: 10;
  cursor: pointer;
}
.menu-button__bar {
  position: absolute;
  top: 0;
  left: 10%;
  display: inline-block;
  width: 80%;
  height: 4px;
  border-radius: 4px;
  background: #fefefc;
  transition: all 0.4s;
}
.menu-button__bar--top {
  top: 6px;
}
.menu-button__bar--center {
  top: 20px;
}
.menu-button__bar--bottom {
  top: 36px;
}
.menu-button.open .menu-button__bar--top {
  top: 20px;
  transform: rotate(-45deg);
}
.menu-button.open .menu-button__bar--center {
  left: 50%;
  opacity: 0;
  transform: rotate(135deg);
}
.menu-button.open .menu-button__bar--bottom {
  top: 20px;
  transform: rotate(45deg);
}

.nav__list {
  display: flex;
  gap: 1rem;
  list-style: none;
  text-transform: uppercase;
}
.nav.sp-menu {
  position: fixed;
  top: 0;
  right: 0;
  padding: 50px;
  width: calc(100% );
  height: calc(100vh);
  @apply bg-grey-hb;
}
.nav.sp-menu .nav__list {
  display: flex;
  flex-direction: column;
}
.nav.sp-menu .nav__list > * + * {
  margin-top: 1rem;
}
.nav__link {
  position: relative;
  color: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
}
.nav__link--current {
  pointer-events: none;
}
.nav__link--current::after {
  content: "";
  position: absolute;
  top: calc(50% - 2px);
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

</style>