<template>
  <section>

    <v-container grid-list-md text-xs-center>


      <v-layout row wrap>

      <v-flex md12 lg4>
        <h2>Où se trouve cette photo sur la carte ?</h2>
        <div class="containerPhoto">
            <img src="https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvNzM3MDAzNjg0XzE5LmpwZw==.jpg" alt="photo">
          </div>
          <p>Temps restant : <strong>30 secondes</strong></p>
      </v-flex>



      <v-flex md12 lg7 offset-lg1>
        <div class="photographie">
            <img src="http://oobrien.com/wordpress/wp-content/uploads/2016/07/googlemaps_july2016.jpg" alt="carte">
            <div>
              <v-btn flat class="suivant">Question suivante</v-btn>
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
</style>
