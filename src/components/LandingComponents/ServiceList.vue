<template>
    <v-item-group class='mt-7'>
             <v-row dense>
          <v-col
            v-for="(item, i) in clients"
            :key="i"
            cols="12"
            
          >
            <v-card
              :color="item.color"
              dark
              class="mx-10 px-10 brown--text text--darken-5"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline brown--text text--darken-1"
                    v-text="item.profession"
                  ></v-card-title>
  
                    <v-card-subtitle  class="brown--text text--lighten-1" v-text="item.name"></v-card-subtitle>
                     <v-card-text>
                        "{{item.opinion}}"
                    </v-card-text>
  
                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      color='brown'
                      outlined
                      rounded
                      small
                    >
                      GO SERVICES
                    </v-btn>
                  </v-card-actions>                  
                </div>
  
                <v-avatar
                  class="ma-3"
                  size="300"
                  tile
                >
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
    </v-item-group>
</template>


<script>
import customer from '../../assets/people/customer2.json'
export default {
    data () {
        return {
            clients: customer.user,
             items: [
                {
                    color: '#1F7087',
                    src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                    title: 'Supermodel',
                    artist: 'Foster the People',
                },
                {
                    color: '#952175',
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    title: 'Halcyon Days',
                    artist: 'Ellie Goulding',
                },
            ]
        }
    }
}
</script>