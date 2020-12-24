<template>
    <v-item-group>
            <v-row>
                <v-col
                v-for="client in clients"
                :key="client.name"
                cols="12"
                md="6"
                >
                    <v-item >
                    <v-card
                        class="mx-auto mt-5"
                        color="indigo lighten-2"
                        dark
                        max-width="550"
                        height="290"
                    >
                        <v-card-title>
                        <v-icon
                            large
                            left
                        >
                            mdi-twitter
                        </v-icon>
                        <span class="title font-weight-light">Twitter</span>
                        </v-card-title>

                        <v-card-text class="headline font-weight-bold">
                        "{{client.opinion}}"
                        </v-card-text>
                        <v-list-item-content>
                            <v-list-item-title class="ml-5 font-weight-bold">{{client.profession}}</v-list-item-title>
                        </v-list-item-content>

                        <v-card-actions>
                        <v-list-item class="grow">
                            <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                alt=""
                                :src="client.image"
                            ></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                            <v-list-item-title>{{client.name}}</v-list-item-title>
                            </v-list-item-content>

                            <v-row
                            align="center"
                            justify="end"
                            >
                            <v-icon class="mr-1">
                                mdi-heart
                            </v-icon>
                            <span class="subheading mr-2">256</span>
                            <span class="mr-1">·</span>
                            <v-icon class="mr-1">
                                mdi-share-variant
                            </v-icon>
                            <span class="subheading">45</span>
                            </v-row>
                        </v-list-item>
                        </v-card-actions>
                        </v-card>
                    </v-item>
                 </v-col>
            </v-row>
    </v-item-group>
</template>


<script>
import customer from '../../assets/people/customer.json'
export default {
    data () {
        return {clients: customer.user}
    }
}
</script>