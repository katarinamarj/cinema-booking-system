import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '@/views/ListView.vue'
import MovieView from '@/views/MovieView.vue'
import CinemaView from '@/views/cinema/CinemaView.vue'
import NewCinema from '@/views/cinema/NewCinema.vue'
import LoginView from '../views/user/LoginView.vue'
import UserView from '../views/user/UserView.vue'
import RegisterView from '../views/user/RegisterView.vue'
import EditCinema from '../views/cinema/EditCinema.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home Page'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Prijava'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Registracija'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: {
        title: 'Korisnik'
      }
    },
    {
      path: '/movie/:link',
      name: 'movie',
      component: MovieView,
      meta: {
        title: 'Film'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
      meta: {
        title: 'Lista'
      }
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: CinemaView,
      meta: {
        title: 'Bioskopi'
      }
    },
    {
      path: '/cinema/new',
      name: 'new-cinema',
      component: NewCinema,
      meta: {
        title: 'Novi Bioskop'
      }
    },
    {
      path: '/cinema/:id',
      name: 'edit-cinema',
      component: EditCinema,
      meta: {
        title: 'Izmeni Bioskop'
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  if(to.meta) {
    document.title = `${to.meta.title} :: PSEP`
  }

  next()
})

export default router
