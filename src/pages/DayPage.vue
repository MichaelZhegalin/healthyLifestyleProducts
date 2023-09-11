<template>
    <v-container class="day-page-container">
        <v-row>
            <v-col>
                <card-for-day 
                    title="Завтрак"
                    subtitle="Съешь сам"
                    imageURL="src/img/breakfast.jpg"
                    routerPush="day/breakfast"
                />
            </v-col>
            <v-col>
                <card-for-day 
                    title="Обед"
                    subtitle="Раздели с другом"
                    imageURL="src/img/lunch.jpg"
                    routerPush="day/lunch"
                />
            </v-col>
            <v-col>
                <card-for-day 
                    title="Ужин"
                    subtitle="Отдай врагу"
                    imageURL="src/img/dinner.jpg"
                    routerPush="day/dinner"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CardForDay from '../components/cards/CardForDay.vue';
    export default {
        components: {CardForDay}
    }
</script>

<style lang="scss">
    .day-page-container{
        position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
    }
</style>