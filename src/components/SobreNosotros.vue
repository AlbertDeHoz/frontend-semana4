<template>
  <v-app>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="miembro in member"
          :key="miembro.codigo.id"
          :value="miembro.nombre"
        >
          <v-card class="pa-2" outlined tile>
            <v-card :loading="loading" class="mx-auto my-12" max-width="374">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <!--<v-img height="250" v-bind:src="'../assets/images'+ 'Emanuel'+'.jpg'" alt="Imagen del integrante"></v-img>
-->
              <img :src="getImgUrl(miembro.image)" v-bind:alt="pic" />
              <v-card-title>{{ miembro.nombre }}</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-icon color="green darken-2"> mdi-domain </v-icon>

                  <div class="grey--text ml-4">{{ miembro.rol }}</div>
                </v-row>

                <div>
                  {{ miembro.descripcion }}
                </div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-title>Grupo 141</v-card-title>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
window.App = { host: '{{ url("/") }}/' };
export default {
  data: () => ({
      pic:'',
    loading: false,
    selection: 1,
    member: [
      {
        codigo: 2,
        nombre: "Nicolay Rivera",
        descripcion:
          " Tengo 45 años, vivo en la ciudad de Pereira.Soy Contador Público y siempre me han gustado la informática.Trabajo con una empresa desarrolladora de software especializada en el sector Público, donde me encargo de realizar las implementaciones.",
        rol: "Desarrollador backend",
        image: "Nicolay.jpg",
      },

      {
        codigo: 3,
        nombre: "Alberto Alonso De la Hoz",
        descripcion:
          "Tengo 23 años y siento una gran pasión por la informática y a la música. Estudié ingeniería mecánica en la universidad del Atlántico y actualmente estoy en proyecto de grado. Casi siempre voy a estar detrás de mi guitarra o de una computadora.",
        rol: "Desarrollador backend",
        image: "Alberto.jpg",
      },
      {
        codigo: 4,
        nombre: "Emanuel Valenciano",
        descripcion:
          "Aprendiz SENA en análisis y desarrollo de sistemasas de información, vivo en la ciiudad de Bogotá me gusta aprender y siempre estare dispuesto a hacerlo, en mi tiempo libre me gusta ver una buena película o salir y tomar el sol, jugar micro también está en las opciones.",
        rol: "Desarrollador backend",
        image: "Emanuel.jpg",
      },
    ],
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    getImgUrl(pic) {
      return require('../assets/images/'+ pic);
    },
  },
};
</script>