<template>
    <div class="container" style="width: 20rem;">
        <div class="row">
            <div class="bg-green-lighten-2 col meal__header">
                <h1 class="text-white">{{title}}</h1>
            </div>
        </div>
    </div>
    <div class="container" style="overflow: auto;">
        <div class="row">
            <div class="col"><carousel></carousel></div>
        </div>
    </div>
</template>

<script>
import Carousel from '../components/Carousel.vue';
export default {
    components: {Carousel},
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

.meal__header{
    border-radius: 10px; 
    margin: 20px 0; 
    display: flex; 
    align-items: center; 
    justify-content: center;
}

</style>