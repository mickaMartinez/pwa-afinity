import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Alumnos from '../views/Alumnos.vue'
import Cursos from '@/views/Cursos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/alumnos',
    name: 'Alumnos',
    component: Alumnos
  },
  {
    path: '/cursos',
    name: 'Cursos',
    component: Cursos
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
