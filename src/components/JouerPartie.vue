<template>
  <section>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex lg4 xs12>
          <div class="photographie">
            <div v-if="partie != undefined">
              <div v-for="(photo, index) in partie.serie.photos" :key="photo.id">

                <div v-if="index == currentIndex" class="containerPhoto">
                  <div>
                    <div>
                      <h2>Où se trouve cette photo sur la carte ?</h2>
                    </div>
                    <img :src="photo.url" :alt="photo.description">
                  </div>
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



      <v-flex lg7 offset-lg1 xs12>
        <div class="column container" id="carte" @click="chrono">
          <div class="carte">
            <!-- Map -->
            <v-map ref="map" :zoom="partie.serie.city.zoom_level" :center="[ partie.serie.city.lat, partie.serie.city.lng]">
              <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
            </v-map>
            <!-- End Map -->
          </div>
        </div>
      </v-flex>

    </v-layout>
  </v-container>
  <v-dialog id="dialog" v-model="result" max-width="500px">
    <v-card>
      <v-card-title>
        <h2>Ma discussion</h2>
        <v-btn @click="nextPhoto()">Photo Suivante</v-btn>
      </v-card-title>

    </v-card>
  </v-dialog>
  <div class="findepartie">
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>
          <h2>{{message}}</h2>
        </v-card-title>
        <v-card-text>
         <router-link to="/finpartie" class="boutonScore">VOIR MON SCORE</router-link>
       </v-card-text>
     </v-card>
   </v-dialog>
 </div>
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
      tempsInit:100,
      currentIndex: 0,
      score: [],
      message: "",
      dialog2 :false,
      result :false,
      d : "",
      t : "",
      markers :""
    }
  },
  beforeDestroy () {
   clearInterval(this.interval)
 },
 mounted () {
  this.interval = setInterval(() => {
    if (this.value !== 0) {
      this.value -= 5
    }else{

      this.score.push({'id': ++this.currentIndex, 'temps' : this.tempsInit, 'distance' : false})

      if(this.currentIndex=== this.partie.serie.photos.length){
        this.$router.push('/finpartie')
      }
      this.value =100
    }
  }, 1000)
  let playerMarker,responseMarker
  let selectedPosition = null
    // L.marker([48.6891776, 6.173155]).addTo(this.$refs.map.mapObject)
    this.$refs.map.mapObject.on('click', e => {
     selectedPosition = {lat: e.latlng.lat, lng: e.latlng.lng};
     playerMarker = L.marker([e.latlng.lat, e.latlng.lng])


     /* Calcul de la distance entre le clic de l'utilisateur et le lieu de la photo en mètre */
     let d;
     this.partie.serie.photos.forEach((photo, index)=>{
      if(index == this.currentIndex){
        d = this.getDistance(selectedPosition, {lat: photo.lat, lng: photo.lng})
        d = Math.round(d)
        responseMarker= L.marker([photo.lat, photo.lng])
      }
    }, d)
     this.d = d
     let markers =L.layerGroup([responseMarker, playerMarker]).addTo(this.$refs.map.mapObject)
     this.markers = markers
     this.result = true
     /* Calcul du temps restant en seconde */
     let t = this.tempsInit - this.value
     this.t = t / 5
   
     
     /* push dans le tableau des scores */
     // this.nextPhoto(this.currentIndex,this.t,this.d,this.score)

     



   })
  },
  methods:{
    getDistance(pos1, pos2) {
      let R = 6371000; // Radius of the earth in m
      let dLat = this.deg2rad(pos2.lat - pos1.lat);  // deg2rad below
      let dLon = this.deg2rad(pos2.lng - pos1.lng);
      let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(pos1.lat)) * Math.cos(this.deg2rad(pos2.lat)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c; // Distance in m
      return d;
    },
    deg2rad(deg){
      return deg * (Math.PI/180)
    },
    chrono(){
      this.value=100;
    },
    precisionRound(number, precision) {
      var factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    },
    setScore(){
      this.$store.dispatch('editScore',this.score).then((response) => {

      }).catch ((error) => {
        console.log(error)
      })
    },
    nextPhoto(){
      
      this.markers.clearLayers()

      if(this.currentIndex+1 == this.partie.serie.photos.length){

      console.log('Finished: success')

      this.$store.dispatch('finish', this.score).then(res => {
        //this.setScore()
        this.$router.push('/finpartie')
      }).catch(e => {
        console.log('Failed with err')
        console.log(e)
      })
     }
     else {
      console.log('Finished: failure')
       this.score.push({'id': this.currentIndex+1, 'temps' : this.t++, 'distance' : this.d})
       this.currentIndex+=1
     }
     this.result = false
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
  height:75vh;
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
.boutonScore{
  text-decoration : none;
  color:black;
}
.boutonScore:hover{
  color:grey;
}
.findepartie{
  z-index:10000;
}
#carte{
  z-index:1;
}
.cache{
  visibility: hidden;
}
#dialog {
  z-index:10000;
}
</style>
