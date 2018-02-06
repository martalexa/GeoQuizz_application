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
                    <div v-if="this.value === 0" class="perdu"><b>perdu</b></div>
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

          <!-- Bouton fin de la partie : faire un v-if il a répendu à toutes les questions -->
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
  height:75vh;
}
img{
    width : 100%;
}
.suivant{
  position : absolute;
  right:0;
}
.containerPhoto{
  display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;


	-ms-flex-justify: center;
	-webkit-justify: center;

	justify-content: center;
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
