<template>
    <div class="container usersList-container">
        <div class="row row-width">
            <users-page-navbar/>
        </div>
        <div class="row">
            <carousel>
                <card-for-user 
                    title="Завтрак"
                    subtitle="Съешь сам"
                    imageURL="../src/img/breakfast.jpg"
                    routerPush="day/breakfast"
                />
            </carousel>
        </div>
        <div class="row">
            <div class="col col-margin">
                <v-btn color="light-green-accent-4" size="x-large">Добавить</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import UsersPageNavbar from '../components/UsersPageNavbar.vue'
    import Carousel from '../components/Carousel.vue'
    import CardForUser from '../components/cards/CardForUser.vue'
    export default {
        components: { UsersPageNavbar, Carousel, CardForUser},
        data(){
            return{
            }
        },
        methods: {
        }
        }
</script>

<style lang="scss" scoped>
    .col-margin{
        margin: 15px 0;
    }
    .row-width{
        width: 100%;
    }
    .usersList-container{
        display: flex; 
        flex-direction: column; 
        align-items: center;
    }
</style>