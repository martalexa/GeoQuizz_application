<template>
    <v-toolbar fixed app color="gray">
        <v-toolbar-title>
          <h1>
            <router-link to="/creationpartie">
              <v-icon>place</v-icon>
              GeoQuizz
            </router-link>
          </h1>
        </v-toolbar-title>
    </v-toolbar>
</template>


<script>
export default {
	name: 'navbar',
	data () {
    return {
    }
	}
}
</script>

<style scoped>
  a {
    text-decoration : none;
    color: black;

  }
</style>
