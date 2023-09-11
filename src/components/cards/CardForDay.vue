<template>
    <v-card class="mx-auto" max-width="344" min-width="250">
        <v-img
            :src="imageURL"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
        >
            <v-card-title class="text-white">{{ title }}</v-card-title>
        </v-img>
        <v-card-subtitle class="card-subtitle">
            "{{ subtitle }}"
        </v-card-subtitle>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="$router.push(`${routerPush}`)" class="btn text-white bg-green-lighten-2">Открыть</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: {
            title: String,
            imageURL: String,
            subtitle: String,
            routerPush: String,
        },
    }
    </script>

<style scoped lang="scss">
    .btn{
        font-weight: 500;
    }
    .card-subtitle{
        margin-top:15px; 
        font-size: 16px; 
        font-style: italic;
    }
</style>