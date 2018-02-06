<template>
  <section>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex md12 lg4>
          <div class="photographie">
            <div>
              <h2>Où se trouve cette photo sur la carte ?</h2>
            </div>
            <div class="containerPhoto">
              <img src="https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvNzM3MDAzNjg0XzE5LmpwZw==.jpg" alt="photo">
            </div>
            <div>
            <v-progress-circular
                v-bind:size="100"
                v-bind:width="15"
                v-bind:rotate="180"
                v-bind:value="value"
                color="green"
                >
                <div v-if="this.value===0" class="perdu">perdu</div>
                <div v-else>{{value}}</div>
            </v-progress-circular>
            </div>
          </div>
        </v-flex>



        <v-flex md12 lg7 offset-lg1>

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

          <div v-if="this.value === 0">
            <v-btn flat class="suivant">Question suivante</v-btn>
          </div>

          <!-- Bouton fin de la partie : faire un v-if il a répondu à toutes les questions -->
          <div>
            <router-link to="/finpartie">fin de la partie</router-link>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
  </section>

</template>

<script>

import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

export default {
	name: 'JouerPartie',
	data () {
		return {
      interval: {},
      value: 100
		}
	},
  beforeDestroy () {
     clearInterval(this.interval)
  },
   mounted () {
     this.interval = setInterval(() => {
       if (this.value !== 0) {
        this.value -= 5
       }
     }, 1000)

     //console.log(window.L);
     //let L = window.L;
     //L.Marker(L.latLng(48.6843900, 6.1849600)).addTo(this.$refs.map.mapObject);
     //L.Marker([48.6843900, 6.1849600]).addTo(this.$refs.map)
     // console.log(this.$refs.map);
     // let marker = Vue2Leaflet.marker([48.6843900, 6.1849600]).addTo(this.$refs.map.mapObject);
     //L.Marker([48.6843900, 7.1849600]).addTo(this.$refs.map.mapObject)
     L.marker([50.5, 30.5]).addTo(this.$refs.map.mapObject);
     this.$refs.map.mapObject.on('click', e => {
       console.log(e)
     })
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
  height:70vh;
}
img{
    width : 100%;
}
.photographie{
  padding-top:5vh;
}
.photographie>div{
  margin:20px;
}
.perdu{
  color:red;
}

</style>
