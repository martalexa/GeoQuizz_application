<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg6 xl6>
        <h1>Fin partie</h1>
        <table class="table is-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Pseudo</th>
              <th>Nombre de points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="score in scores" :key="score.id">
              <td>rien</td>
              <td>{{score.player_username}}</td>
              <td>{{score.score}}</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  name: 'FinPartie',
  data () {
    return {
      scores: []
    }
  },
  components :{

  },
  mounted(){
    window.axios.get('parties')
      .then((response) => {
        this.scores = response.data
        //for(let i = 10)
      })
      .catch ((error) => {
        console.log(error)
      })
  },
  methods:{
    getScore(){
      window.axios.get('parties')// plus id de la partie
      .then((response) => {
        console.log(response.data)
      })
      .catch ((error) => {
        console.log(error)
      })
    }
  }
}
</script>


<style scoped>

</style>
