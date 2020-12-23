<template>
    <v-app-bar class="indigo accent-1">
        <v-avatar
        class="ma-3"
        size="30"
        tile
        >
        <v-img src="https://cdn.pixabay.com/photo/2019/08/11/18/20/icon-4399581_960_720.png"></v-img>
        </v-avatar>
        <v-toolbar-title class ='yellow--text text--lighten-5'>Inbourn Services</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
        text
        to='/nosotros'>
            Services
        </v-btn>
        <v-btn
        v-if="inHome()" 
        text
        to='/nosotros'>
            Nosotros
        </v-btn>
        <v-btn
        v-else
        text
        to='/'>
            Home
        </v-btn>
        <v-btn 
        icon
        to="/login"
        >
          <v-icon>mdi-account</v-icon>
          
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    methods : {
        inHome(){
            return location.href === 'http://localhost:8080/'
        }
    }
}
</script>