<template>
  <section>
    <h1>Jouer la partie</h1>
      <div class="columns is-mobile">
        <div class="column">
          <p class="carte">la petite carte</p>
        </div>
        <div class="column">
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
.carte{
  border :1px solid black;

  height:90vh;
  margin-left:25px;
}
</style>
