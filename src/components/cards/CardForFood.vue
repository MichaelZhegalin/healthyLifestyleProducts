<template>
    <v-card class="mx-auto" max-width="1050" min-width="350">
        <v-container>
            <v-row>
                <v-col cols="3" class="d-flex justify-start align-center">
                    <h3>{{ foodName }}</h3>
                </v-col>
                <v-col 
                    cols="7" 
                    class="d-flex justify-space-between 
                            align-center 
                            CardForFood__characteristics-text-container"
                >
                    <span class="CardForFood__characteristics-text">Калории: {{calories}}</span>
                    <span class="CardForFood__characteristics-text">Белки: {{ proteins }}</span>
                    <span class="CardForFood__characteristics-text">Жиры: {{ fats }}</span>
                    <span class="CardForFood__characteristics-text">Углеводы: {{ carbs }}</span>
                </v-col>
                <v-col cols="2" class="d-flex justify-end align-center">
                    <v-btn
                        class="btn bg-red-lighten-2 text-white"
                        @click="deleteFood"
                    >
                    Удалить
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import { useFoodInfo } from '@/store/foodInfoModule'
    export default {
        props:{
            id: String
        },
        data(props){
            return{
                foodName: useFoodInfo().foods[props.id].foodName,
                calories: useFoodInfo().foods[props.id].calories,
                proteins: useFoodInfo().foods[props.id].proteins,
                fats: useFoodInfo().foods[props.id].fats,
                carbs: useFoodInfo().foods[props.id].carbs,
            }
        },
        methods:{
            deleteFood(){
                useFoodInfo().deleteFood(this.id);
            }
        }
    }
</script>

<style>
    .CardForFood__characteristics-text-container{
        font-size: 18px;
    }
    .CardForFood__characteristics-text{
        background-color: rgba(0,0,0, 0.1);
        border-radius: 5px;
        padding: 6px;
    }
</style>