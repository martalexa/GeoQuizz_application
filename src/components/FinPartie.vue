<template>
  <v-container grid-list-md text-xs-center>
    <h1>Vous avez fini votre partie !</h1></br>
    <h2>Meilleurs scores</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg4 xl4>
        <h2>5 images</h2>
        <table class="table is-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Pseudo</th>
              <th>Nombre de points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score5, index) in scores5.slice(0,10)" :key="score5.id">
              <td>{{index+1}}</td>
              <td>{{score5.res.player_username}}</td>
              <td>{{score5.res.score}}</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4 xl4>
        <h2>10 images</h2>
        <table class="table is-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Pseudo</th>
              <th>Nombre de points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score10, index) in scores10.slice(0,10)" :key="score10.id">
              <td>{{index+1}}</td>
              <td>{{score10.res.player_username}}</td>
              <td>{{score10.res.score}}</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4 xl4>
        <h2>15 images</h2>
        <table class="table is-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Pseudo</th>
              <th>Nombre de points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score15, index) in scores15.slice(0,10)" :key="score15.id">
              <td>{{index+1}}</td>
              <td>{{score15.res.player_username}}</td>
              <td>{{score15.res.score}}</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
    <router-link to="/" flat color="dark grey" >Jouer une nouvelle partie</router-link>
  </v-container>

</template>

<script>
export default {
  name: 'FinPartie',
  data () {
    return {
      scores: [],
      scores5: [],
      scores10: [],
      scores15: [],
    }
  },
  components :{

  },
  created(){
    window.axios.get('parties')
      .then((response) => {
        response.data.forEach((res)=> {
          if(res.nb_photos == '5'){
            this.scores5.push({res})
          }
          if(res.nb_photos == '10'){
            this.scores10.push({res})
          }
          if(res.nb_photos == '15'){
            this.scores15.push({res})
          }
        })
        this.scores5.sort(function(a, b) {
              return b.res.score - a.res.score
        })
        this.scores10.sort(function(a, b) {
              return b.res.score - a.res.score
        })
        this.scores10.sort(function(a, b) {
              return b.res.score - a.res.score
        })
      })
      .catch ((error) => {
        console.log(error)
      })
  },
  mounted(){

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
