<template>
<v-app>
    <v-container>
        <data-categories/>
    </v-container>
</v-app>
</template>

<script>
import DataCategories from '../components/DataCategories'
export default {
    name : 'categories',
    components: {
        DataCategories
    }
}
</script>