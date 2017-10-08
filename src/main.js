// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store/'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.config.productionTip = false

import MapaUbicacion from '@/components/util/MapaUbicacion'
import InputSitio from '@/components/util/InputSitio'

import Componentes from 'componentes-vue'
import {getPaises, getProvincias, getDepartamentos, getLocalidades} from './util/paths'
Vue.use(Componentes,
  { pais: getPaises,
    provincia: getProvincias,
    departamento: getDepartamentos,
    localidad: getLocalidades
  },
  store)

import 'flatpickr/dist/themes/material_blue.css'
import 'componentes-vue/dist/componentes-vue.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.component('mapa-ubicacion', MapaUbicacion)
Vue.component('input-sitio', InputSitio)
Vue.use(BootstrapVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvaZN9QijRtjwMWf4IyG5fiWDj46rOJDw',
    libraries: 'places,visualization'
  }
})

Vue.axios.defaults.headers.common['Authorization'] = 'TOKEN'

/* axios.interceptors.response.use(function (response) {
  if (response.status === 200 && response.headers.mensaje) {
    Vue.prototype.$toastr('success', response.headers.mensaje, 'Exito')
  } else if (response.status !== 200) {
    Vue.prototype.$toastr('error', 'Se produjo un error. Contacte con el administrador.', 'Error')
  }
  return response
}, function (error) {
  Vue.prototype.$toastr('error', 'Se produjo un error. Contacte con el administrador.', 'Error')
  return Promise.reject(error)
}) */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
