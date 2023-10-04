<template>
    <v-container class="container-size">
        <v-row>
            <v-col>
                <v-autocomplete 
                    clearable
                    v-model="foodName"
                    :items="foodNames" 
                    label="Выберите блюдо, которое вы ели"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="12">
                <v-text-field
                    :value="dishWeight"
                    @input="setDishWeight"
                    label="Сколько грамм вы съели"
                    variant="underlined"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
    export default{
        props: {
            dishWeight: String,
            foodNameProp: String,
            foodNames: Array
        },
        data() {
            return{
            }
        },
        methods: {
            setDishWeight(event){
                this.$emit('setDishWeight', event.target.value);
            },
            setFoodName(event){
                this.$emit('setFoodName', event.target.value);
            }
        },
        computed: {
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