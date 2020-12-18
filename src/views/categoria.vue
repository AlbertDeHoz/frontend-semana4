<template>
    <v-container>
        <data-categories/> 
    </v-container>
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