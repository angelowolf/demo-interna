<template>
  <div>
   <mapa-ubicacion @idLocalidad="cambiaLocalidad" codigoSitio="CO008" :idLoc="87" :latitud="-36" :longitud="-66"></mapa-ubicacion>
   <mapa-ubicacion ></mapa-ubicacion>
  </div>
</template>
<script>
  export default {
    name: 'SitiosForm',
    data () {
      return {
        modal: false
      }
    },
    methods: {
      cambiaLocalidad (idLocalidad) {
      }
    }
  }
</script>