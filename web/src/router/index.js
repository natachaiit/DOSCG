import { createRouter, createWebHistory } from 'vue-router'
import FindXYZ from '../views/FindXYZ.vue'
import FindBC from '../views/FindBC.vue'
import GotoCentalWorld from '../views/GotoCentalWorld.vue'

const routes = [
  {
    path: '/',
    name: 'FindXYZ',
    component: FindXYZ
  },
  {
    path: '/findbc',
    name: 'FindBC',
    component: FindBC
  },
  {
    path: '/gotoeental',
    name: 'GotoCental',
    component: GotoCentalWorld
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
