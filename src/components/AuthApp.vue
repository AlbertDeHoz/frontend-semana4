<template>

  <v-app>
      <v-toolbar>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-toolbar-title>Proyecto Final</v-toolbar-title>
  
        <v-spacer></v-spacer>
        <v-btn 
        icon
        to ="/"
        >
          <v-icon>mdi-home-variant</v-icon>
          
        </v-btn>
  
        <v-btn 
        icon
        @click="salir()"
        >
          <v-icon>mdi-arrow-left</v-icon>
          
        </v-btn>
  
      </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{this.$store.state.user.rol}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in isAdmin()"
          :key="item.title"
          link
          :to = "item.to"
        >
          <v-list-item-icon 
          >
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content
          >
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
   
    <router-view/>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
export default {
  name: 'AuthApp',

  components: {
    //HelloWorld,
  },

  data: () => {
    return {
        drawer: null,
        items: [
          { to:'/', title: 'Home', icon: 'mdi-view-dashboard'},
          { to: '/auth/categorias', title: 'Categorías', icon: 'mdi-forum' },
          { to: '/auth/articulos', title: 'Artículos', icon: 'mdi-forum' },
          { to: '/auth/usuarios', title: 'Usuarios', icon: 'mdi-account-group'}
        ],
        items2: [
          { to:'/', title: 'Home', icon: 'mdi-view-dashboard'},
          { to: '/auth/categorias', title: 'Categorías', icon: 'mdi-forum' },
          { to: '/auth/articulos', title: 'Artículos', icon: 'mdi-forum' },
        ],
      }
  },
  created () {
    this.$store.dispatch('autoLogin')
  },
  methods: {
    salir () {
      this.$store.dispatch('salir');
    },
    isAdmin() {
        return this.$store.state.user.rol==='Administrador'?this.items:this.items2
      
    }
  }
};
</script>
