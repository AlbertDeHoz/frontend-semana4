<template>

  <v-app>
      <v-toolbar>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-toolbar-title>Title</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
          
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
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
          <v-list-item-title>Leonard Cohen</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to = "item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
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
  name: 'App',

  components: {
    //HelloWorld,
  },

  data: () => {
    return {
        drawer: null,
        items: [
          { to:'/', title: 'Home', icon: 'mdi-view-dashboard' },
          { to: '/categorias', title: 'Categorías', icon: 'mdi-forum' },
          { to: '/Articulos', title: 'Artículos', icon: 'mdi-forum' }
        ],
      }
  },
};
</script>
