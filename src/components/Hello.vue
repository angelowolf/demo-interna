<template>
  <div class="hello">
    <select-ubicacion :esFiltro="false" classSelect="col-md-3 col-sm-12"
    @paisSeleccionado="paisSeleccionado"
    @provinciaSeleccionada="provinciaSeleccionada"
    @departamentoSeleccionado="departamentoSeleccionado"
    @localidadSeleccionada="localidadSeleccionada"
    :idLocalidad="2182">
    </select-ubicacion>
  </div>
</template>

<script>
export default {
  name: 'filtroMunicipios',
  data () {
    return {
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
    buscar () {
      this.$emit('buscar', this.filtros)
    },
    paisSeleccionado (id) {
      this.filtros.idPais = id
    },
    provinciaSeleccionada (id) {
      this.filtros.idProvincia = id
    },
    departamentoSeleccionado (id) {
      this.filtros.idDepartamento = id
    },
    localidadSeleccionada (id) {
      this.filtros.idLocalidad = id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
