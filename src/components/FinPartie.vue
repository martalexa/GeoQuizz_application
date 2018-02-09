<template>
  <v-container grid-list-md text-xs-center>
    <h1>Vous avez fini votre partie : avec {{score.final_score}} points !</h1></br>

    <v-expansion-panel focusable>
    <v-expansion-panel-content>

      <div slot="header"><h2>Détails du score</h2></div>
      <v-card>
        <v-card-text class="grey lighten-3">

        <!-- Tableau des scores du joueur -->
        <v-layout row wrap>
          <v-flex xs12 xl6 offset-xl3>
            <table class="table is-striped">
              <thead>
                <tr>
                  <th>Photos</th>
                  <th>Distance (m)</th>
                  <th>Temps (s)</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(s, index) in score.rows_result">
                  <td>{{index + 1}}</td>
                  <td>{{s.distance}}</td>
                  <td>{{s.nb_seconds}}</td>
                  <td>{{s.score}}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Score total</td>
                  <td>{{score.final_score}}</td>
                </tr>
              </tbody>
            </table>
          </v-flex>
        </v-layout>


        </v-card-text>
      </v-card>
    </v-expansion-panel-content>

    <v-expansion-panel-content>
      <div slot="header"><h2>Meilleurs scores</h2></div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 lg4 xl4>
            <h3>5 images</h3>
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
            <h3>10 images</h3>
            <table class="table is-striped">
              <thead>
                <tr>
                  <th>Pseudo</th>
                  <th>Nombre de points</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(score10, index) in scores10.slice(0,10)" :key="score10.id">
                  <td>{{score10.res.player_username}}</td>
                  <td>{{score10.res.score}}</td>
                </tr>
              </tbody>
            </table>
          </v-flex>
          <v-flex xs12 sm12 md12 lg4 xl4>
            <h3>15 images</h3>
            <table class="table is-striped">
              <thead>
                <tr>
                  <th>Pseudo</th>
                  <th>Nombre de points</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(score15, index) in scores15.slice(0,10)" :key="score15.id">
                  <td>{{score15.res.player_username}}</td>
                  <td>{{score15.res.score}}</td>
                </tr>
              </tbody>
            </table>
          </v-flex>
        </v-layout>

        </v-card-text>
      </v-card>

    </v-expansion-panel-content>
  </v-expansion-panel>






    <router-link to="/" flat color="dark grey"  class="btn">Nouvelle partie</router-link>




  </v-container>

</template>

<script>
import{mapGetters} from 'vuex'
export default {
  name: 'FinPartie',
  data () {
    return {
      scores: [],
      scores5: [],
      scores10: [],
      scores15: [],
      fab: false,
      hidden: false,
      tabs: 'edit'
    }
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
  computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'color': 'indigo', icon: 'share' }
          case 'two': return { 'color': 'red', icon: 'edit' }
          case 'three': return { 'color': 'green', icon: 'zaezaezaezeazea', text:'erzerzerz' }
          default: return {}
        }
      },




    ...mapGetters({score: 'getScore'})
  }
}
</script>


<style scoped>
.btn {
  margin-top : 50px;
  padding :0 15px;
}
#lateral {
  height: 400px;
}

#lateral .speed-dial, #lateral .btn--floating {
    position: absolute;
}
h3{
  text-align:center;
}
</style>
