<template>
  <v-item-group class="mt-7">
    <v-row dense>
      <v-col v-for="(item, i) in articulos" :key="i" cols="12">
        <v-card
          color="rgb(222,230,250)"
          
          class="mx-10 px-10 brown--text text--darken-5"
          v-if="item.estado === 1"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline brown--text text--darken-1"
                v-text="item.nombre"
              ></v-card-title>

              <v-card-title
                class="headline brown--text text--darken-1"
                v-text="item.descripcion"
               
              ></v-card-title>
             

              <v-card-actions>
                <v-btn class="ml-2 mt-5" color="brown" outlined rounded small>
                  GO SERVICES
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="300" tile>
              <v-img :src="item.image"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
  </v-item-group>
</template>


<script>
import axios from "axios";
//import customer from "../../assets/people/customer2.json";
export default {
  data() {
    return {
      //clients: customer.user,
      articulos: [],
    };
  },

 created() {
    this.listarArticulos();
  },

  methods: {
    listarArticulos() {
      axios
          .get("http://localhost:3000/api/articulo/list")
          .then((response) => {
            this.articulos = response.data;
          
          })
          .catch((error) => {
            console.log(error);
          });

    },
  },
};
</script>