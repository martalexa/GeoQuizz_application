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
            <tr v-if="score.nb_photos == '5'" v-for="(score, index) in score5" :key="score.id">
              <td>{{index+1}}</td>
              <td>{{score.player_username}}</td>
              <td>{{score.score}}</td>
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
            <tr v-if="score.nb_photos == '10'" v-for="(score, index) in score10" :key="score.id">
              <td>{{index+1}}</td>
              <td>{{score.player_username}}</td>
              <td>{{score.score}}</td>
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
            <tr v-if="score.nb_photos == '15'" v-for="(score, index) in score15" :key="score.id">
              <td>{{index+1}}</td>
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
      scores: [],
      score5: [],
      score10: [],
      score15: [],
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
            //this.score5 += score
            console.log('5')
          }
          if(score.nb_photos == '10'){
            //this.score10 += score
            console.log('10')
          }
          if(score.nb_photos == '15'){
            //this.score15 += score
            console.log('15')
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
