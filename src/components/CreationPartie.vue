<template>
     <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg3 xl3>
                <v-btn color="primary" dark @click.stop="modal = true">Open Dialog 2</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md6 lg3 xl3>
                <v-btn color="primary" dark @click.stop="modal = true">Open Dialog 2</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md6 lg3 xl3>
                <v-btn color="primary" dark @click.stop="modal = true">Open Dialog 2</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md6 lg3 xl3>
                <v-btn color="primary" dark @click.stop="modal = true">Open Dialog 2</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md6 lg3 xl3>
                <v-btn color="primary" dark @click.stop="modal = true">Open Dialog 2</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md6 lg3 xl3>
                <v-btn color="primary" dark @click.stop="modal = true">Open Dialog 2</v-btn>
            </v-flex>
        </v-layout>
        <v-dialog v-model="modal" max-width="500px">
          <v-card>
            <form>
                <v-text-field label="Pseudo" v-model="pseudo" required ></v-text-field>
                <v-text-field label="Nombre de photos" v-model="nbImages" required></v-text-field>
                <v-btn @click="submit">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
            </form>
          </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
	name: 'CreationPartie',
	data () {
		return {
            modal: false,
            pseudo: '',
            nbImages: ''
		}
	},
	components :{
	},
	methods:{
        clear () {
            this.pseudo = ''
            this.nbImages = ''
        }
	}
}
</script>


<style scoped>
 /*.column{
    width: 25%;
   height: auto;
}
@media screen and (max-width: 640px) {
  .column {
    width: 100%;
  }
}*/
</style>
