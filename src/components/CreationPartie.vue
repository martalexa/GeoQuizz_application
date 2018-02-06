<template>
     <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg3 xl3 v-for="serie in series" :key="serie.id">
                <v-btn color="primary" dark @click.stop="modal = true, serie_id = serie.id, serie_name = serie.city_name" id="serie">{{serie.city_name}}</v-btn>
            </v-flex>
        </v-layout>
        <v-dialog v-model="modal" max-width="500px">
            <v-card>
                <v-card-title>
                    <h2>{{serie_name}}</h2>
                </v-card-title>
                <v-card-text>
                    <form>
                        <v-text-field label="Pseudo" v-model="pseudo" required></v-text-field>
                        <v-select :items="choix" label="Nombre de photos" item-value="text" v-model="nbImages"></v-select>
                        <v-btn @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
	name: 'CreationPartie',
	data () {
		return {
            series: [],
            serie_id: '',
            modal: false,
            pseudo: '',
            nbImages: '',
            serie_name: '',
            choix: [
                { text: '5' },
                { text: '10' },
                { text: '15' }
            ]
		}
	},
    created(){
        // let router = this.$router;
        // setTimeout(function() {
        //     router.push({'name': 'jouer'})
        // }, 5000);
    },
	mounted (){
        window.axios.get('series')
			.then((response) => {
                this.series = response.data
			}).catch ((error) => {
				console.log(error)
			})
	},
	methods:{
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
            
            this.$store.dispatch('createPartie', {
                player_username : this.pseudo,
                serie_id: this.serie_id,
                nb_photos: this.nbImages
			}).then((res) => {
                this.$router.push({name: 'jouer'})
            }).catch((err) => {

            })
        }
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
</style>
