import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Movies from '@/pages/Movies.vue'
import MyTickets from '@/pages/MyTickets.vue'
import ClubHouse from '@/pages/ClubHouse.vue'
import Signout from '@/pages/Signout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/my-tickets',
      name: 'my-tickets',
      component: MyTickets
    },
    {
      path: '/club-house',
      name: 'club-house',
      component: ClubHouse
    },
    {
      path: '/signout',
      name: 'sign-out',
      component: Signout
    }
  ]
})

router.beforeEach(async (to, from) => {

  const isAuthenticated = ( localStorage.getItem('user_token') == null ? false : true );

  // User authenticate and redirect to login page if unauthenticated
  if ( !isAuthenticated && to.name !== 'login' ) {
    return { name: 'login' }
  }
})

export default router
