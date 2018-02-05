<template>
  <section>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap >

        <v-flex  lg6 md12 offset-md0 offset-lg1>
            <img src="http://oobrien.com/wordpress/wp-content/uploads/2016/07/googlemaps_july2016.jpg" alt="carte">
        </v-flex>

        <v-flex offset-lg1 lg4 offset-md1 md4 class="container">
          <div class="photographie">
            <h2>Où se trouve cette photo ?</h2>
            <img src="https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvNzM3MDAzNjg0XzE5LmpwZw==.jpg" alt="photo">
            <div>
              <v-btn flat>Question suivante</v-btn>
            </div>
          </div>
        </v-flex>

        </v-layout>
      </v-container>
    </section>

</template>

<script>
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
  height:75vh;
}

img{
    width : 100%;
}
.container{
  position : relative;

}

.photographie{
  position: absolute;
  top: 50%; /* poussé de la moitié de hauteur du référent */
  transform: translateY(-50%); /* tiré de la moitié de sa propre hauteur */
}


</style>
