<template>
  <section>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex md12 lg4>
          <div class="photographie">
            <div>
              <h2>Où se trouve cette photo sur la carte ?</h2>
            </div>

            <div>
              <h2>{{message}}</h2>
            </div>

            <div v-if="partie != undefined">
              <div v-for="(photo, index) in partie.serie.photos" :key="photo.id">
                  <div v-if="index == currentIndex" class="containerPhoto">
                      <img :src="photo.url" :alt="photo.description">
                  </div>
              </div>
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
import {mapGetters} from 'vuex'


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
      value: 100,
      currentIndex: 0,
      score: [],
      message: ""
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

     let selectedPosition = null
     L.marker([50.5, 30.5]).addTo(this.$refs.map.mapObject);
     this.$refs.map.mapObject.on('click', e => {
       selectedPosition = {lat: e.latlng.lat, lng: e.latlng.lng};
       let d = this.getDistance(selectedPosition, {lat: 48.6843900, lng: 6.1849600});
       this.score.push({id: this.currentIndex, distance: d});
       this.currentIndex ++;
       if(this.currentIndex == this.partie.serie.photos.length){
         this.message = "Bravo!";
         this.$store.dispatch('finish').then(res => {
            this.$router.push({name: 'fin'})
         })
       }
     })
   },
	methods:{
    getDistance(pos1, pos2) {
      let R = 6371000; // Radius of the earth in km
      let dLat = this.deg2rad(pos2.lat - pos1.lat);  // deg2rad below
      let dLon = this.deg2rad(pos2.lng - pos1.lng); 
      let a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(pos1.lat)) * Math.cos(this.deg2rad(pos2.lat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c; // Distance in km
      return d;
    },
    deg2rad(deg){
      return deg * (Math.PI/180)
    }
  },
  computed: {
    ...mapGetters({partie: 'getPartie', finished: 'finished'})
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
