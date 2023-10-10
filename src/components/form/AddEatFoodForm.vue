<template>
    <v-container class="container-size">
        <v-row class="pa-5">
            <v-autocomplete 
                clearable
                v-model="foodName"
                :items="foodNames" 
                label="Выберите блюдо, которое вы ели"
                variant="underlined"
            />
        </v-row>
        <v-row class="pa-5">
            <v-text-field
                :value="dishWeight"
                @input="setDishWeight"
                label="Сколько грамм вы съели"
                variant="underlined"
            />
        </v-row>
    </v-container>
</template>
  
<script>
    export default{
        props:{
            dishWeight: String,
            foodNameProp: String,
            foodNames: Array
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
        },
        computed:{
            foodName: {
                get(){
                    return this.foodNameProp
                },
                set(value){
                    return this.$emit('setFoodName', value)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-size{
        width: 20rem;
    }
</style>