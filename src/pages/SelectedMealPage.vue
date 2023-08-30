<template>
    <div class="container meal-container">
        <div class="row row-width">
            <div class="bg-green-lighten-2 col meal-header">
                <h1 class="text-white">{{title}}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <carousel>
                    <card-for-day 
                        title="Завтрак"
                        subtitle="Съешь сам"
                        imageURL="../src/img/breakfast.jpg"
                        routerPush="day/breakfast"
                    />
                </carousel>
            </div>
        </div>
        <div class="row">
            <div class="col col-margin">
                <v-btn color="light-green-accent-4" size="x-large">Добавить</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import Carousel from '../components/Carousel.vue';
    import CardForDay from '../components/cards/CardForDay.vue';
    export default {
        components: {Carousel, CardForDay},
        data(){
            return{
                title: undefined,
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
    .col-margin{
        margin: 15px 0;
    }
    .row-width{
        width: 20rem;
    }
    .meal-header{
        border-radius: 10px; 
        margin: 20px 0; 
        display: flex; 
        align-items: center; 
        justify-content: center;
    }
    .meal-container{
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        overflow: auto;
    }
</style>