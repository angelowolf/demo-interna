import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SitiosListado from '@/components/sitios/SitiosListado'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/sitios',
      name: 'SitiosListado',
      component: SitiosListado
    }
  ]
})
