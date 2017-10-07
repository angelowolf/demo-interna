<template>
  <div class="animated fadeIn">
  
    <btn-el :haciendo="buscando" @click="data = []"></btn-el>
    
    <!-- <btn-el :haciendo="buscando" label="permisos" v-permiso="{funcionalidad:'usuario',permiso:'Ver'}"></btn-el> -->

    <!-- <router-link append :to="'nuevo'" class="btn btn-success btn-sm float-right"><i class="fa fa-plus"></i> Nuevo</router-link> -->
         
    <btn-nv :haciendo="buscando" @click="modalAlta = true" class="float-right"></btn-nv>


    <sitios-filtro :buscando="buscando" @buscar="buscar"></sitios-filtro>


    <tabla titulo="Usuarios" :buscando="buscando" :data="data" :columnas="columnas" :titulos="titulos" :acciones="acciones" :paginacion="paginacion" @consultar="consultar" @editar="editar" @eliminar="eliminar"></tabla>


    <b-modal title="Modal title" v-model="modalAlta" @ok="modalAlta = false" size="lg">
      <sitios-form v-if="modalAlta"></sitios-form>
    </b-modal>
    <b-modal title="Eliminar Usuario" v-model="modalEliminar" @ok="confimrarEliminarUsuario" ok-title="Si" cancel-title="Cancelar">¿ Está seguro que desea eliminar este usuario ?
    </b-modal>
  </div>
</template>
<script>
import flatpickConfig from '@/util/flatpickConfig'
import paginacionConfig from '@/util/paginacionConfig'
import {getSitios} from '@/util/paths'
import SitiosFiltro from './SitiosFiltro'
import SitiosForm from '../form/SitiosForm'

export default {
  name: 'test-listado',
  components: {
    SitiosFiltro,
    SitiosForm
  },
  mixins: [flatpickConfig, paginacionConfig],
  data () {
    return {
      modalAlta: false,
      modalEliminar: false,
      idUsuarioEliminar: 0,
      buscando: false,
      data: [],
      columnas: [
        'sitCodigo', 'sitOwner', 'sitFechaCarga', 'sitNombre'
      ],
      titulos: [
        'Codigo', 'Owner', 'Fecha Carga', 'Nombre'
      ],
      acciones: [
        {name: 'consultar', label: '', icon: 'fa fa-eye', class: 'btn btn-info', idData: 'id'},
        {name: 'editar', label: '', icon: 'fa fa-edit', class: 'btn btn-warning', idData: 'id'},
        {name: 'eliminar', label: '', icon: 'fa fa-remove', class: 'btn btn-danger', idData: 'id'}
      ],
      filtros: {
        nombre: '',
        contacto: '',
        nroOrdenanza: '',
        compania: '',
        idPais: -1,
        idProvincia: -1,
        idDepartamento: -1,
        idLocalidad: -1,
        gestor: ''
      }
    }
  },
  methods: {
    buscar (filtros) {
      if (filtros !== null) {
        this.filtros = filtros
      }
      this.buscando = true
      let params = Object.assign({}, this.filtros, this.paginacion)
      this.$http.get(getSitios, { params: params }).then(response => {
        this.data = response.data.contenidoPagina
        this.buscando = false
      }).catch(e => { this.buscando = false })
    },
    eliminar (idData) {
      this.idUsuarioEliminar = idData
      this.modalEliminar = true
    },
    confimrarEliminarUsuario () {
      this.$http.delete(getSitios + '/' + this.idUsuarioEliminar).then(response => {
        this.buscar(null)
      })
    },
    consultar (idData) {
      alert('consulto ' + idData)
    },
    editar (idData) {
      alert('edito ' + idData)
    }
  },
  mounted () {
    // this.buscar(null)
  }
}
</script>
