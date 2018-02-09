<template>
  <v-container grid-list-md text-xs-center>
    <h1>Vous avez fini votre partie : avec 1000 points !</h1></br>

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
              <tbody v-for="leScore in scoreFinal">
                <tr>
                  <td>{{leScore.id}}</td>
                  <td>{{leScore.distance}}</td>
                  <td>{{leScore.temps}}</td>
                  <td>{{leScore.score}}</td>
                </tr>
              </tbody>
            </table>
          </v-flex>
        </v-layout>


        </v-card-text>
      </v-card>
    </v-expansion-panel-content>

    <v-expansion-panel-content>
      <div slot="header"><h2>Meilleurs scores des parties à {{partie.nb_photos}} images</h2></div>
      <v-card>
        <v-card-text class="grey lighten-3">
        <v-layout row wrap>
           <v-flex xs12 sm12 md12 lg12 xl12>
            <table class="table is-striped">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Pseudo</th>
                  <th>Nombre de points</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(scored, index) in scoresDetails.slice(0,10)" :key="scored.id">
                  <td>{{index+1}}</td>
                  <td>{{scored.player_username}}</td>
                  <td>{{scored.score}}</td>
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
      scoresDetails: [],
      fab: false,
      hidden: false,
      tabs: 'edit'
    }
  },
  methods: {

  },
  created(){
    this.$store.dispatch('allParties')
      .then((res) => {
        
        res.data.forEach(partieData => {
          if(partieData.nb_photos = this.partie.nb_photos){
            this.scoresDetails.push(partieData)
          }
        })
        
        this.scoresDetails.sort(function(a, b) {
          return b.score - a.score
        })
      })
      .catch ((error) => {
        console.log(error)
      })    
  },
  computed: {
    ...mapGetters({scoreFinal: 'getScore'}),
    ...mapGetters({partie: 'getPartie'})
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
