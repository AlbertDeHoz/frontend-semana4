<template>
  <div class="home">
    <router-link to = "/auth">auth</router-link>|
    <router-link to = "/login">login</router-link>
    <landing-page msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LandingPage from '../components/LandingPage.vue'

export default {
  name: 'Home',
  components: {
    LandingPage
  }
}
</script>