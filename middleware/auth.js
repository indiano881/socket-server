// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser(); // Get the current authenticated user
    
    if (!user.value) {
      // If no user is authenticated, redirect to the login page
      return navigateTo('/login');
    }
  });