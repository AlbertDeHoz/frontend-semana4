<template>
    <v-app>
        <nav-bar/>
        <v-divider></v-divider>
        <sobre-nosotros></sobre-nosotros>
    </v-app>
</template>
<script>

import SobreNosotros from '../components/SobreNosotros'
import NavBar from '../components/NavBar'
export default {
    components:{
        SobreNosotros,
        NavBar
    }
}
</script>