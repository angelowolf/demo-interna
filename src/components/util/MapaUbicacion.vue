<template>
    <div class="animated fadeIn">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <btn-cp block v-b-toggle.accordion1 label="Geoposición"/>
          </b-card-header>
          <b-collapse id="accordion1" visible>
            <b-card-body>
             <div class="row no-gutters">
                 <div class="col-8">
                    <gmap-map :center="center" :zoom="5" map-type-id="roadmap" style="width: 100%; height: 100%"
                    @click="clickMapa">
                      <gmap-marker v-if="marcador" :position="marcador"></gmap-marker>
                    </gmap-map>
                 </div>
                 <div class="col-4 p-2">
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                          <label style="margin-bottom: 0px;">Localización</label>
                          <p class="input-group input-group-sm m-b-none" style="width: 100%;">
                            <select
                            class="form-control form-control-sm"
                            name="localizacion"
                            v-model="localizacion"
                            @change="cambiaLocalizacion">
                              <option value="-1" disabled="true">Seleccione...</option>
                              <option value="sitio">Sitio...</option>
                              <option value="coordenadas">Coordenadas...</option>
                            </select>
                          </p>
                          <span class="text-danger" v-show="false">
                            <i class="fa fa-exclamation-triangle"></i> Por favor seleccione una localización
                          </span>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <label style="margin-bottom: 0px;">Sitio</label>
                          <p class="input-group input-group-sm m-b-none" style="width: 100%;">
                            <input type="text" name="sitio" class="form-control" placeholder="Sitio..." :disabled="disabledSitio" maxlength="5" @blur="buscarSitio" v-model="codSitio">
                          </p>
                          <span class="text-danger" v-show="false">
                            <i class="fa fa-exclamation-triangle"></i> Por favor ingrese un sitio
                          </span>
                          <span class="text-danger" v-show="sitioNoEncontrado">
                            <i class="fa fa-exclamation-triangle"></i> El Sitio no existe
                          </span>
                        </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 col-sm-12">
                        <label style="margin-bottom: 0px;">Latitud</label>
                        <p class="input-group input-group-sm m-b-none" style="width: 100%;">
                          <input type="text" name="latitud" class="form-control" placeholder="Latitud..." maxlength="5" disabled="true" :value="ubicacionLatitud">
                        </p>
                      </div>
                      <div class="col-md-6 col-sm-12">
                        <label style="margin-bottom: 0px;">Longitud</label>
                        <p class="input-group input-group-sm m-b-none" style="width: 100%;">
                          <input type="text" name="longitud" class="form-control" placeholder="Longitud..." maxlength="5" disabled="true" :value="ubicacionLongitud">
                        </p>
                      </div>
                    </div>
                    <select-ubicacion :esFiltro="false" classSelect="col-md-6 col-sm-12"
                    @localidadSeleccionada="localidadSeleccionada"
                    :disabledPais="disabledPais"
                    :disabledProvincia="disabledProvincia"
                    :disabledDepartamento="disabledDepartamento"
                    :disabledLocalidad="disabledLocalidad"
                    >
                    </select-ubicacion>
                    <div class="col-12" style="margin-top: 10px;" v-if="false">
                      <div class="alert alert-warning">
                        <span class="text-danger">
                            <i class="fa fa-exclamation-triangle"></i> Por favor seleccione todas las opciones...
                        </span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                          <button type="button" class="btn btn-primary m-t-none" style="width:100%; color:white;" @click="buscarGeoposicion"><i class="fa fa-crosshairs fa-1x"></i> Buscar Geoposición
                          </button>
                      </div>
                    </div>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
  </div>
</template>
<script>
import {getSitios} from '@/util/paths'

export default {
  data () {
    return {
      localizacion: -1,
      ubicacionLatitud: null,
      ubicacionLongitud: null,
      center: {lat: -31.420083299999995, lng: -64.1887761},
      marcador: null,
      habilitarPais: false,
      validando: false,
      validacion: {paiId: null},
      disabledPais: true,
      disabledProvincia: true,
      disabledDepartamento: true,
      disabledLocalidad: true,
      disabledSitio: true,
      codSitio: null,
      sitioNoEncontrado: false
    }
  },
  methods: {
    clickMapa (ubicacion) {
      if (this.localizacion === 'coordenadas') {
        this.marcador = {lat: null, lng: null}
        this.cargarLatitudes(ubicacion.latLng.lat(), ubicacion.latLng.lng())
      }
    },
    cambiaLocalizacion () {
      if (this.localizacion === 'sitio') {
        this.disabledSitio = false
      } else {
        this.disabledSitio = true
      }
      this.limpiarSeleccion()
    },
    localidadSeleccionada () {},
    buscarGeoposicion () {},
    buscarSitio () {
      this.sitioNoEncontrado = false
      this.$http.get(getSitios + `/this.codSitio`).then(response => {
        if (response.data) {
          this.cargarLatitudes(response.data.lat, response.data.lng)
        } else {
          this.sitioNoEncontrado = true
        }
      })
    },
    limpiarSeleccion () {
      this.marcador = null
      this.ubicacionLatitud = null
      this.ubicacionLongitud = null
    },
    cargarLatitudes (lat, lng) {
      this.marcador.lat = lat
      this.marcador.lng = lng
      this.ubicacionLatitud = lat
      this.ubicacionLongitud = lng
    }
  }
}
</script>
<style scoped>
  .card-header > button:focus, button:active {
      outline: none;
      box-shadow: none;
  }
  header.p-1 {
      padding: 0 !important;
  }
  .card-header .btn {
      margin-top: 0;
  }
  label {
    font-weight: bold;
    font-size: .8em;
  }
</style>
