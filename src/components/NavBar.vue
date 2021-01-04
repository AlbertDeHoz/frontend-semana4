<template>
    <v-app-bar class="brown lighten-1">
        <v-avatar
        class="ma-3"
        size="30"
        tile
        >
        <v-img src="https://cdn.pixabay.com/photo/2019/08/11/18/20/icon-4399581_960_720.png"></v-img>
        </v-avatar>
        <v-toolbar-title class ='brown--text text--lighten-5'>Inbourn Services</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
        text
        class ='brown--text text--lighten-5'
        to='/#'>
            Services
        </v-btn>
        <v-btn
        v-if="inHome()" 
        text
        class ='brown--text text--lighten-5'
        to='/nosotros'>
            Nosotros
        </v-btn>
        <v-btn
        v-else
        text
        class ='brown--text text--lighten-5'
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