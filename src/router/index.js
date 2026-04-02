import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Cadastro from '@/views/Cadastro.vue'
import Editar from '@/views/Editar.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/cadastro', component: Cadastro },
  { path: '/editar/:id', component: Editar }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router