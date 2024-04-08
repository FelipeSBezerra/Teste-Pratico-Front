import Vue from 'vue'
import VueRouter from 'vue-router'
import EmpresasView from '../views/empresa/Empresas.vue'
import LeiloesView from '../views/leilao/Leiloes.vue'
import UnidadesView from '../views/unidade/Unidades.vue'
import EmpresaView from '../views/empresa/Empresa.vue'
import HomeView from '../views/home/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
      path: '/unidades',
      name: 'unidades',
      component: UnidadesView
  },
  {
      path: '/leiloes',
      name: 'leiloes',
      component: LeiloesView
  },
  {
      path: '/empresas',
      name: 'empresas',
      component: EmpresasView
  },
  {
    path: '/empresa',
    name: 'empresa',
    component: EmpresaView
  },
  {
    path: '/empresa/:id',
    name: 'empresaEdit',
    component: EmpresaView
  },
  {
      path: '*',
      redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
