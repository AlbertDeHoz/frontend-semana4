<template>
  <v-app>
    <nav-bar/>
    <landing-page msg="Welcome to Your Vue.js App"/>
    <footer-page/>
  </v-app>
</template>

<script>
import FooterPage from '../components/FooterPage.vue'
import LandingPage from '../components/LandingPage.vue'
import NavBar from '../components/NavBar.vue'
export default {
  name: 'Home',
  components: {
    NavBar,
    LandingPage,
    FooterPage
  }
}
</script>