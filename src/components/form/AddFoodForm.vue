<template>
    <v-container class="container-size">
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="foodInfo.foodName"
                    label="Название блюда"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="foodInfo.calories"
                    label="Калории на 100г."
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="foodInfo.proteins"
                    label="Белки на 100г."
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="foodInfo.fats"
                    label="Жиры на 100г."
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="foodInfo.carbs"
                    label="Углеводы на 100г."
                    variant="underlined"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
    export default {
        props:{
            foodInfo: Object,
        },
    }
</script>

<style lang="scss" scoped>
    .container-size{
        width: 25rem;
    }
</style>