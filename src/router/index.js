import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Movies from '@/pages/Movies.vue'
import MyTickets from '@/pages/MyTickets.vue'
import ViewTicket from '@/pages/ViewTicket.vue'
import ClubHouse from '@/pages/ClubHouse.vue'
import Purchase from '@/pages/Purchase.vue'
import Payment from '@/pages/Payment.vue'
import ChooseSeats from '@/pages/ChooseSeats.vue'
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
      path: '/view-ticket/:bref',
      name: 'view-ticket',
      component: ViewTicket
    },
    {
      path: '/club-house',
      name: 'club-house',
      component: ClubHouse
    },
    {
      path: '/purchase/:movieid',
      name: 'ticket-purchase',
      component: Purchase
    },
    {
      path: '/purchase/seats/:movieid/:hallid/:scheduleid',
      name: 'choose-seats',
      component: ChooseSeats
    },
    {
      path: '/payment',
      name: 'paymnet',
      component: Payment
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
