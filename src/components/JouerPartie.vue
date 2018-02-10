<template>
  <section>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex md12 lg4>
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
              <v-progress-circular v-if="partie != undefined"
              v-bind:size="100"
              v-bind:width="15"
              v-bind:rotate="180"
              v-bind:value="value"
              color="green"
              >
              <div v-if="value===0 && !answered" class="perdu">perdu</div>
              <div v-else>{{value / 5}}</div>
            </v-progress-circular>
          </div>
          <div v-if="answered">
            <v-btn color="primary" @click="nextPhoto()">Suivant</v-btn>
          </div>
        </div>
      </v-flex>


      <v-flex lg7 offset-lg1 xs12>
        <div class="column container" id="carte">
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
</section>

</template>

<script>

import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'
import {mapGetters} from 'vuex'
import store from '@/store'

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
      sorted_rules: null,
      d : "",
      t : "",
      markers : null,
      answered: false,
      global_score: {
        rows_result: [],
        final_score: 0
      },
      working: false,
      latLngObjects: []
    }
  },
  beforeDestroy () {
   clearInterval(this.interval)
  },
  beforeRouteEnter(to, from, next) {
    if(store.getters.isFinished == true || store.getters.getPartie == null){
      next({name: 'create_partie'})
    }
    next()
  },
  mounted () {
      
      //Initialisation de l'interval pour décrementer la valeur dans le compte à rebours
      this.interval = setInterval(() => {
        if (this.value !== 0) {
          this.value -= 5
        }else{
          if(this.answered == false) {
            this.global_score.rows_result.push({
                nb_seconds: "Pas de réponse",
                distance: "Pas de réponse",
                score: 0
            })
          }

          this.answered = false

          if(this.markers != null) {
            this.markers.clearLayers()
          }

          if(this.currentIndex + 1 === this.partie.serie.photos.length){
            this.finishGame()
          }else{
            this.currentIndex ++
            this.$refs.map.fitBounds(this.latLngObjects)
            this.value = this.maxNbSeconds()
          }
        }
      }, 1000)


      //Récupération de la position choisie par le joueur lors du clique sur la carte

      let selectedPosition = null

      if(this.latLngObjects.length == 0){
        for(let photo of this.partie.serie.photos) {
          this.latLngObjects.push([photo.lat, photo.lng])
        }
      }

      this.$refs.map.mapObject.fitBounds(this.latLngObjects)

      this.$refs.map.mapObject.on('click', e => {

          if(this.answered == true){
            console.log('Already answered')
            return false
          }
          console.log('not answered yet')
          this.answered = true

          if(this.markers != null){
            this.markers.clearLayers()
          }
          if(this.sorted_rules == null) {
            this.sorted_rules = this.sortRules()
          }
          selectedPosition = {lat: e.latlng.lat, lng: e.latlng.lng};

          /* Calcul de la distance entre le clic de l'utilisateur et le lieu de la photo en mètre */
          let d = null
          let selectedMarker = null
          this.partie.serie.photos.forEach((photo, index)=>{
              if(index == this.currentIndex){
                selectedMarker = L.marker([photo.lat, photo.lng])
                d = this.getDistance(selectedPosition, {lat: photo.lat, lng: photo.lng})
                d = Math.round(d)
              }
          }, d)

         this.markers = L.layerGroup([selectedMarker, L.marker([e.latlng.lat, e.latlng.lng])]).addTo(this.$refs.map.mapObject)

         console.log(selectedMarker.getLatLng())
         this.$refs.map.mapObject.fitBounds([[selectedMarker.getLatLng().lat, selectedMarker.getLatLng().lng], [e.latlng.lat, e.latlng.lng]])

         /* Calcul du temps restant en seconde */
         let t = (this.maxNbSeconds()) - this.value
         t = t / 5
         t = parseInt(t)

         let row_result = {
            nb_seconds: t,
            distance: d,
            score: 0
         }

         //Calcul du score initial obtenu par rapport à la distance
         for(let palier of this.sorted_rules.paliers){
           if(row_result.distance <= (palier.coef * this.partie.serie.distance)){
            row_result.score = palier.points
            break
           }
         }
         //Multiplication du score initial par rapport aux seconds
         for(let time of this.sorted_rules.times){
           if(row_result.nb_seconds <= (time.nb_seconds)){

            row_result.score = row_result.score * time.coef
            break
           }
         }
         this.global_score.rows_result.push(row_result)
         this.global_score.final_score += row_result.score

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
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c; // Distance in m
      return d;
    },
    deg2rad(deg){
      return deg * (Math.PI/180)
    },
    precisionRound(number, precision) {
      var factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    },
    setScore(){
      // this.$store.dispatch('editScore',this.score).then((response) => {

      // }).catch ((error) => {
      //   console.log(error)
      // })
    },
    finishGame() {
      if(this.working){
        return
      }
      this.working = true
      this.$store.dispatch('sendScore', this.global_score).then(res => {
         this.$router.push({name: 'fin'})
      }).catch(e => {

      })
    },
    nextPhoto(){

      if(this.currentIndex+1 == this.partie.serie.photos.length){
          this.finishGame()
      }
      else {
          this.currentIndex+=1
          this.markers.clearLayers()
          this.answered = false
          this.value = this.maxNbSeconds()
          this.$refs.map.mapObject.fitBounds(this.latLngObjects)
     }
   
 },

  maxNbSeconds() {
      if(this.partie != undefined){
        let sorted = this.partie.serie.rules.times
        sorted = sorted.sort((a, b) => {
          if(a.nb_seconds < b.nb_seconds){
            return 1
          }
          return -1
        })
        return sorted[0].nb_seconds * 5
      }else{
        console.log('Pass to 100')
        this.value = 100
        return 100
      }
  },

  sortRules() {
        let sorted_rules = {
          paliers: [],
          times: []
        }

        for(let time of this.partie.serie.rules.times){
          sorted_rules.times.push({
            nb_seconds: time.nb_seconds,
            coef: time.coef
          })
        }

        for(let palier of this.partie.serie.rules.paliers){
          sorted_rules.paliers.push({
            coef: palier.coef,
            points: palier.points
          })
        }
        sorted_rules.times.sort((a, b) => {
          return a.nb_seconds - b.nb_seconds
        })
        sorted_rules.paliers.sort((a, b) => {
          return a.coef - b.coef
        })
        return sorted_rules
  }

},

   computed: {
    ...mapGetters({partie: 'getPartie', finished: 'finished'})
  },
   created() {
      this.value = this.maxNbSeconds()
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
