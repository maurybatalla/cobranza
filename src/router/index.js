import { createRouter, createWebHistory } from 'vue-router'
import Cargar from '../components/Cargar.vue'
//import Editar from '../components/Editar.vue'
import Listar from '../components/Listar.vue'


const routes = [

  {
    path: '/cargar/:id',
    name: 'Cargar',
    component: Cargar
  },

  {
    path: '/listar',
    name: 'Listar',
    component: Listar
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
