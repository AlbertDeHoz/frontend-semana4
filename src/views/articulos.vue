<template>
  <v-app>
    <v-container>
      <data-articulos/>
    </v-container>
  </v-app>
</template>

<script>
import DataArticulos from "../components/DataArticulos";
export default {
  name: "articulos",
  components: {
    DataArticulos,
  },
};
</script>