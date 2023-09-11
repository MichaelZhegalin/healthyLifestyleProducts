<template>
    <v-container class="container-size">
        <v-row>
            <v-col cols="6">
                <v-text-field
                    v-model="name"
                    :counter="10"
                    label="Имя"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="age"
                    :counter="3"
                    label="Возраст"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="height"
                    :counter="3"
                    label="Рост"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="weight"
                    :counter="3"
                    label="Вес"
                    variant="underlined"
                />
            </v-col>
            <v-col block>
                <v-select 
                    v-model="gender" 
                    :items="genderItem" 
                    label="Пол"
                    variant="underlined"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
    export default{
        data(){
            return{
                name: '',
                age: '',
                height: '',
                weight: '',
                gender: '',
                genderItem: ["Мужчины", "Женщина"]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-size{
        width: 20rem;
    }
</style>