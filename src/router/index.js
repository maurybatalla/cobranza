import { createRouter, createWebHistory } from 'vue-router'
//import Crear from '../components/Crear.vue'
//import Editar from '../components/Editar.vue'
import Listar from '../components/Listar.vue'

const routes = [

  /*{
    path: '/crear',
    name: 'Crear',
    component: Crear
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: Editar
  },*/
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
