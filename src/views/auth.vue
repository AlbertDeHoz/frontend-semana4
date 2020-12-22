<template>

  <v-app>
    <auth-app/>
  </v-app>
</template>

<script>
import AuthApp from "../components/AuthApp";


export default {
  name: 'Autorizacion',

  components: {
      AuthApp
  }
}
</script>
<!--
<template>
  <div class="auth">  
    <auth-app/>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthApp from '../components/AuthApp'

export default {
  name: 'Autorizacion',
  components: {
    AuthApp
  }
}
</script>
-->