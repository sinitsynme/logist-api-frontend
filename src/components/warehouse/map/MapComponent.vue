<template>
  <div style="height:400px; width:500px">
    <l-map ref="map" v-model:zoom="zoom" :center="[this.lat, this.lng]" :options="{attributionControl: false}">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

export default {

  props: [
    "lat",
    "lng"
  ],

  mounted() {
    this.marker = new L.LatLng(this.lat, this.lng)
  },
  updated() {
    this.marker = new L.LatLng(this.lat, this.lng)
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 16,
      marker: {}
    };
  },
};
</script>

<style></style>