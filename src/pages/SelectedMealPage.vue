<template>
    <v-container>
        <v-row>
            <v-col cols="4" offset="4">
                <div class="bg-green-lighten-2 meal-header">
                    <h1 class="text-white">{{title}}</h1>
                </div>
            </v-col>
            <v-col class="mealPage_col-center" cols="12">
                <carousel :ObjWithInfo="ObjWithInfo">
                    <template v-slot:default="cardSlot">
                        <card-for-user 
                            :id="cardSlot.cardId"
                        />
                    </template>   
                </carousel>
            </v-col>
            <v-col class="mealPage_col-center" cols="12">
                <v-btn class="bg-green-lighten-2 text-white" size="x-large">Добавить</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Carousel from '../components/Carousel.vue';
    import CardForDay from '../components/cards/CardForDay.vue';
    import { useFoodInfo } from '@/store/foodInfoModule';
    export default {
        components: {Carousel, CardForDay},
        data(){
            return{
                title: undefined,
                ObjWithInfo: useFoodInfo().foodInfo,
            }
        },
        mounted(){
            this.$route.params.meal.localeCompare('breakfast') === 0 ? this.title = 'Завтрак': '';
            this.$route.params.meal.localeCompare('lunch') === 0 ? this.title = 'Обед': '';
            this.$route.params.meal.localeCompare('dinner') === 0 ? this.title = 'Ужин': '';
        }
    }
</script>

<style scoped lang="scss">
    .meal-header{
        border-radius: 10px; 
        display: flex; 
        justify-content: center;
    }
    .mealPage_col-center{
        display: flex;
        justify-content: center;
    }
</style>