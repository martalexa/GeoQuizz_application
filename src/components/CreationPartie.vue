<template>
     <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg3 xl3>
                <v-btn color="primary" dark @click.stop="modal = true" id="serie">Open Dialog 2</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md6 lg3 xl3 v-for="serie in series" :key="serie.id">
                <v-btn color="primary" dark @click.stop="modal = true, serie_id = serie.id, serie_name = serie.city_id" id="serie">{{serie.city_id}}</v-btn>
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
                        <v-text-field label="Nombre de photos" v-model="nbImages" required></v-text-field>
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
            serie_name: ''
		}
	},
	mounted (){
        window.axios.get('serie')
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
            window.axios.post('parties', {
                player_username : this.pseudo,
                serie_id: this.serie_id,
                nb_photos: this.nbImage
			})
			.then((response) => {
                console.log('coucou')
			}).catch ((error) => {
				console.log(error)
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
