import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import Movies from '@/pages/Movies.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    }
  ]
})

router.beforeEach(async (to, from) => {

  // const isAuthenticated = ( localStorage.getItem('user') == null ? false : true );

  const isAuthenticated = true; // todo: Change this to dynamic login

  // User authenticate and redirect to login page if unauthenticated
  if ( !isAuthenticated && to.name !== 'Login' ) {
    return { name: 'login' }
  }
})

export default router
