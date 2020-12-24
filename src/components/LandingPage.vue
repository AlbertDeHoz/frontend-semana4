<template>
   <v-app id="inspire">
    <v-carousel
      cycle
      height="500"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="src[i]"
      >
        <v-row class="text-center" justify="center">
    <v-col
      cols="12"
      md="4"
    >
    <v-btn
      class="headline mr-7 mt-10"
      color='white'
      outlined
      rounded
    >
      INBOUND MARKETING SERVICES HERE!
    </v-btn>
    </v-col>
  </v-row>
      </v-carousel-item>
    </v-carousel>
    <service-list/>
    <customer-opinion/>
  </v-app>

</template>

<script>
import CustomerOpinion from './LandingComponents/CustomerOpinion'
import ServiceList from './LandingComponents/ServiceList.vue'
  export default {
  components: { CustomerOpinion, ServiceList},
   data () {
    
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      src: [
        'https://cdn.pixabay.com/photo/2015/07/27/20/27/mockup-863469_960_720.jpg',
        'https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_960_720.jpg',
        'https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_960_720.jpg',
        'https://cdn.pixabay.com/photo/2018/05/12/11/37/team-3393037_960_720.jpg',
        'https://cdn.pixabay.com/photo/2019/05/18/14/42/jogging-4211946_960_720.jpg',

      ],
    }
  },

  }
</script>
