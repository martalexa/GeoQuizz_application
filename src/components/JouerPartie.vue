<template>
  <section>
      <div class="columns is-desktop">
        <div class="column container">
          <p class="carte">la petite carte</p>
        </div>
        <div class="column container">
          <p>Où se trouve cette photo ?</p>
          <img src="https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvNzM3MDAzNjg0XzE5LmpwZw==.jpg" alt="photo">
        </div>
      </div>

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


</style>
