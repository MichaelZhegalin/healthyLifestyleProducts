<template>
    <v-container class="container-size">
        <v-row>
            <v-col cols="12">
                <v-text-field
                    :value="foodName"
                    @input="setFoodName"
                    label="Название блюда"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="calories"
                    @input="setCalories"
                    label="Калории на 100г."
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="proteins"
                    @input="setProteins"
                    label="Белки на 100г."
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="fats"
                    @input="setFats"
                    label="Жиры на 100г."
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="carbs"
                    @input="setCarbs"
                    label="Углеводы на 100г."
                    variant="underlined"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
    export default{
        props:{
            foodName: String,
            calories: String,
            proteins: String,
            fats: String,
            carbs: String,
        },
        methods:{
            setFoodName(event){
                this.$emit('setFoodName', event.target.value);
            },
            setCalories(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setCalories', event.target.value);
                } 
            },
            setProteins(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setProteins', event.target.value);
                }  
            },
            setFats(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setFats', event.target.value);
                }
            },
            setCarbs(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setCarbs', event.target.value);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container-size{
        width: 25rem;
    }
</style>