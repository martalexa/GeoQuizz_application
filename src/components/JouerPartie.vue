<template>
  <section>
      <div class="columns is-desktop">
        <div class="column container">
          <div class="carte">
            <!-- Map -->
            <v-map ref="map" :zoom="13" :center="[48.6843900, 6.1849600]">
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                <v-marker :lat-lng="[48.6843900, 6.1849600]"></v-marker>
            </v-map>
            <!-- End Map -->
          </div>
        </div>
        <div class="column container">
          <p>Où se trouve cette photo ?</p>
          <img src="https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvNzM3MDAzNjg0XzE5LmpwZw==.jpg" alt="photo">
          <a class="button is-success is-outlined">
            Question suivante
          </a>
        </div>
      </div>

    </section>

</template>

<script>

import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

export default {
	name: 'JouerPartie',
	data () {
		return {

		}
	},
	components :{
	},
	methods:{
	}
}
</script>


<style scoped>
  section{
    margin : 20px;
  }

  .carte{
    border :1px solid black;
    height:50vh;
  }


</style>
