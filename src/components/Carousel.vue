<template>
    <v-carousel
        height="550"
        hide-delimiters
    >
        <v-carousel-item v-for="i in Math.ceil(slides.length/3)" :key="i">
            <v-sheet height="100%" style="overflow: auto;">
                <div class="d-flex fill-height justify-center align-center">
                    <div class="row carousel__row">
                        <div v-for="slide in listCardForShow(i - 1)" :key="slide" class="col">
                            <card-for-day 
                                title="Завтрак"
                                subtitle="Съешь сам"
                                imageURL="../src/img/breakfast.jpg"
                                routerPush="day/breakfast"
                            ></card-for-day>
                        </div>
                    </div>
                </div>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import CardForDay from './cards/CardForDay.vue';
export default {
  components: { CardForDay },
    data() {
      return {
        slides: ['First', 'Second', 'First', 'Second', 'First', 'Second'],
      }
    },
    methods: {
        listCardForShow(number){
            let listCard = [];
            for(let i = 0; i < 3; i++){
                if(this.slides[i + 3*number] !== undefined){
                    listCard[i] = this.slides[i + 3*number];
                }else{
                    i = 3;
                }
            }
            return listCard
        }
    }
}
</script>

<style scoped lang="scss">

.carousel__row{
    width: 80%; 
    height:100%; 
    display: flex; 
    align-items: center; 
    gap: 10px
}

</style>