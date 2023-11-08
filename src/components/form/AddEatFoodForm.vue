<template>
    <v-container class="container-size">
        <v-row class="pa-5">
            <v-autocomplete 
                clearable
                v-model="eatFoodInfo.foodName"
                :items="eatFoodInfo.foodNames" 
                label="Выберите блюдо, которое вы ели"
                variant="underlined"
            />
        </v-row>
        <v-row class="pa-5">
            <v-text-field
                v-model="eatFoodInfo.dishWeight"
                label="Сколько грамм вы съели"
                variant="underlined"
            />
        </v-row>
    </v-container>
</template>
  
<script>
    export default {
        props:{
            eatFoodInfo: Object
        },
        methods:{
            setDishWeight(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setDishWeight', event.target.value);
                }
            },
            setFoodName(event){
                this.$emit('setFoodName', event.target.value);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-size{
        width: 20rem;
    }
</style>