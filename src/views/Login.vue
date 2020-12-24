<template>
  <v-app >
    <nav-bar/>
    <log-in/>
  </v-app>
</template>


<script>
import LogIn from '../components/LogIn'
import NavBar from '../components/NavBar.vue'

export default {
  components: { LogIn,NavBar },
   
}
</script>
