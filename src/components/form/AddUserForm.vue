<template>
    <v-container class="container-size">
        <v-row>
            <v-col cols="6">
                <v-text-field
                    v-model="userInfo.userName"
                    :counter="10"
                    label="Имя"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="userInfo.age"
                    :counter="3"
                    label="Возраст"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="userInfo.height"
                    :counter="3"
                    label="Рост"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="userInfo.weight"
                    :counter="3"
                    label="Вес"
                    variant="underlined"
                />
            </v-col>
            <v-col>
                <v-select 
                    v-model="userInfo.gender"
                    :items="userInfo.genderItem" 
                    label="Пол"
                    variant="underlined"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
    export default {
        props:{
            userInfo: Object
        }
    }
</script>

<style lang="scss" scoped>
    .container-size{
        width: 20rem;
    }
</style>