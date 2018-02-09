<template>
     <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6 lg3 xl3 v-for="serie in series" :key="serie.id" class="containerPartie">
            <v-layout>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0"></h3>
                    </div>
                  </v-card-title>

                  <v-card-media height="300px">
                    <img :src="serie.image" :alt="serie.name">
                  </v-card-media>

                  <v-card-actions>
                    <v-btn flat color="secondary" @click.stop="modal = true, serie_id = serie.id, serie_name = serie.name, getCount()" id="serie">Jouer</v-btn>
                  </v-card-actions>

                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <h1 v-if="series.length == 0">Aucune serie disponible. Reviens plus tard</h1>
        </v-layout>
        <v-dialog v-model="modal" max-width="500px">
            <v-card>
                <v-card-title>
                    <h2>{{serie_name}}</h2>
                    <p>{{erreur}}</p>
                </v-card-title>
                <v-card-text>
                    <form>
                        <v-text-field label="Pseudo" v-model="pseudo" required></v-text-field>
                        <v-select :items="choix" label="Nombre de photos" item-value="text" v-model="nbImages" required></v-select>
                        <v-btn @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'CreationPartie',
	data () {
		return {
            serie_name: '',
            serie_id: null,
            modal: false,
            pseudo: '',
            nbImages: null,
            choix: [],
            erreur: ''
		}
	},
    created(){
        this.$store.dispatch('loadSeries').then(res => {

        }).catch(e => {
            console.log(e)
        })
    },
	methods:{
        getCount(){
            this.$store.dispatch('count', this.serie_id)
                .then(res=>{
                    this.choix = []
                    Number.prototype.mod = function(n) {
                        var m = (( this % n) + n) % n;
                        return m < 0 ? m + Math.abs(n) : m;
                    };
                    if(parseInt(res.data).mod(2)===0){
                        for(let i = 10;i<res.data;i=i+5){
                            this.choix.push({'text':i})
                        }
                    }else{
                        for(let i = 10;i<res.data;i=i+5){
                            this.choix.push({'text':i})
                        }
                        this.choix.push({'text':res.data})
                    }
                })
                .catch(e=>{
                    console.log(e)
                })
        },
        countImage(){
            for(let i = 0;i<this.count;i+2){
                if(i<this.count){
                    this.choix.push({'text':i})
                }else{
                    this.choix.push({'text':54})
                }
            }
        },
        clear () {
            this.pseudo = ''
            this.nbImages = ''
        },
        submit(){
            // window.axios.post('parties', {
            //     player_username : this.pseudo,
            //     serie_id: this.serie_id,
            //     nb_photos: this.nbImages
			// })
			// .then((response) => {
            //     console.log('coucou')
			// }).catch ((error) => {
			// 	console.log(error)
            // })
            if(this.serie_id !== null && this.nbImages !== null && this.pseudo !== ''){
                this.$store.dispatch('createPartie', {
                    player_username : this.pseudo,
                    serie_id: this.serie_id,
                    nb_photos: this.nbImages
                }).then((res) => {
                    this.$router.push({name: 'jouer'})
                }).catch((err) => {
                    console.log('Fail to create the partie')
                })
            }else{
                this.erreur = 'Remplissez tous les champs !!'
            }
            
        }
    },
    computed:{
        ...mapGetters({series: 'getSeries'})
    }
}
</script>


<style scoped>
    #serie{
        width: 100%;
    }
    .vue2leaflet-map{
      position:relative;
    }
    .containerPartie{
    margin-left : 50px;
    }
</style>
