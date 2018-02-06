<template>
  <div id="app">

    <v-app light>
      <navbar></navbar>
      <v-container mt-5 id="main">
        <router-view ></router-view>
      </v-container>
      <footerBar></footerBar>
    </v-app>

  </div>
</template>

<script>
import Navbar from './components/Navbar'
import footerBar from './components/footerBar'

export default {
  name: 'App',
    components: { Navbar, footerBar }
  }
</script>

<style>
  @import "leaflet/dist/leaflet.css";
</style>
