<template>
    <div class="container" style="margin-top: 20px;">
        <div class="row" style="display: flex; gap: 10px;">
            <div class="col">
                <card-for-day 
                    title="Завтрак"
                    subtitle="Съешь сам"
                    imageURL="src/img/breakfast.jpg"
                    routerPush="day/breakfast"
                ></card-for-day>
            </div>
            <div class="col">
                <card-for-day 
                    title="Обед"
                    subtitle="Раздели с другом"
                    imageURL="src/img/lunch.jpg"
                    routerPush="day/lunch"
                ></card-for-day>
            </div>
            <div class="col">
                <card-for-day 
                    title="Ужин"
                    subtitle="Отдай врагу"
                    imageURL="src/img/dinner.jpg"
                    routerPush="day/dinner"
                ></card-for-day>
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

<style>

</style>