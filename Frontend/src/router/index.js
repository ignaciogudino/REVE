import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ResultadosView from '../views/ResultadosView.vue'
import PublicacionView from '../views/PublicacionView.vue'
import NuevaPublicacionView from '../views/NuevaPublicacionView.vue'
import MisSolicitudesView from '../views/MisSolicitudesView.vue'
import MisPublicacionesView from '../views/MisPublicacionesView.vue'
import PreguntasFrecuentesView from '../views/PreguntasFrecuentesView.vue'
import TerminosCondicionesView from '../views/TerminosCondicionesView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/resultados/:lugar',
    name: 'ResultadosView',
    component: ResultadosView
  },
  {
    path: '/publicacion/:idPublicacion',
    name: 'PublicacionView',
    component: PublicacionView
  },
  {
    path: '/nueva-publicacion',
    name: 'NuevaPublicacionView',
    component: NuevaPublicacionView
  },
  {
    path: '/mis-solicitudes',
    name: 'MisSolicitudesView',
    component: MisSolicitudesView
  },
  {
    path: '/mis-publicaciones',
    name: 'MisPublicacionesView',
    component: MisPublicacionesView
  },
  {
    path: '/faq',
    name: 'PreguntasFrecuentesView',
    component: PreguntasFrecuentesView
  },
  {
    path: '/tyc',
    name: 'TerminosCondicionesView',
    component: TerminosCondicionesView
  }
]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

//TODO: Si no esta logueado lo mando al login. Cambiar cuando este hecho lo del jwt Bearer
router.beforeEach(async (to) => {
  const isAuthenticated = localStorage.getItem('token')
  if (!isAuthenticated && to.path !== '/login') 
    return { path: '/login' }
})

export default router
