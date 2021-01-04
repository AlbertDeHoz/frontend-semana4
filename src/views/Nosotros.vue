<template>
    <v-app>
        <nav-bar/>
        <v-divider></v-divider>
        <sobre-nosotros></sobre-nosotros>
        <footer-page/>
    </v-app>
</template>
<script>

import SobreNosotros from '../components/SobreNosotros'
import NavBar from '../components/NavBar'
import FooterPage from '../components/FooterPage'
export default {
    components:{
        SobreNosotros,
        NavBar,
        FooterPage
    }
}
</script>