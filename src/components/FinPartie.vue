<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg4 xl4>
        <h1>5 images</h1>
        <table class="table is-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Pseudo</th>
              <th>Nombre de points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="score5.nb_photos == '5'" v-for="(score5, index) in scores5" :key="score5.id">
              <td>{{index+1}}</td>
              <td>{{score5.player_username}}</td>
              <td>{{score5.score}}</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4 xl4>
        <h1>10 images</h1>
        <table class="table is-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Pseudo</th>
              <th>Nombre de points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="score10.nb_photos == '10'" v-for="(score10, index) in scores10" :key="score10.id">
              <td>{{index+1}}</td>
              <td>{{score5.player_username}}</td>
              <td>{{score5.score}}</td>
            </tr>
          </tbody>
        </table>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4 xl4>
        <h1>15 images</h1>
        <table class="table is-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Pseudo</th>
              <th>Nombre de points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="score15.nb_photos == '15'" v-for="(score15, index) in scores15" :key="score15.id">
              <td>{{index+1}}</td>
              <td>{{score5.player_username}}</td>
              <td>{{score5.score}}</td>
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
        /*this.scores = response.data.sort(function(a, b) {
            return a.score + b.score
        })*/
        response.data.forEach((score)=> {
          if(score.nb_photos == '5'){
            this.scores5 += score
            console.log('5')
            console.log(score)
          }
          if(score.nb_photos == '10'){
            this.scores10 += score
            console.log('10')
            console.log(score)
          }
          if(score.nb_photos == '15'){
            this.scores15 += score
            console.log('15')
            console.log(score)
          }
          
        })
      })
      .then(()=>{
        /*this.score5.slice(0,10)
        this.score10.slice(0,10)
        this.score15.slice(0,10)*/
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
