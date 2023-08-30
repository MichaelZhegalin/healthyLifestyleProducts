<template>
    <div class="container day-page-container">
        <div class="row row-flex">
            <div class="col">
                <card-for-day 
                    title="Завтрак"
                    subtitle="Съешь сам"
                    imageURL="src/img/breakfast.jpg"
                    routerPush="day/breakfast"
                />
            </div>
            <div class="col">
                <card-for-day 
                    title="Обед"
                    subtitle="Раздели с другом"
                    imageURL="src/img/lunch.jpg"
                    routerPush="day/lunch"
                />
            </div>
            <div class="col">
                <card-for-day 
                    title="Ужин"
                    subtitle="Отдай врагу"
                    imageURL="src/img/dinner.jpg"
                    routerPush="day/dinner"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import CardForDay from '../components/cards/CardForDay.vue';
    export default {
        components: {CardForDay}
    }
</script>

<style lang="scss">
    .row-flex{
        display: flex; gap: 10px;
    }
    .day-page-container{
        position: absolute; 
        top: 40%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        background-color: rgba(191,193,194, .8); 
        border-radius: 20px;
        padding: 20px 10px; 
        margin: 25px 0; 
        max-height: 30rem; 
        overflow-y: auto; 
        overflow-x: hidden; 
    }
</style>