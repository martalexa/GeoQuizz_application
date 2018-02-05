<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    <footerBar></footerBar>
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

</style>
