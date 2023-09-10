<template>
    <div class="carousel-container">
        <v-carousel
            height="400"
            hide-delimiters
        >
            <v-carousel-item v-for="i in Math.ceil(slides.length/3)" :key="i">
                <v-sheet height="100%" class="carousel-sheet">
                    <div class="d-flex fill-height justify-center align-center">
                        <div class="row carousel-row">
                            <div v-for="slide in listCardForShow(i - 1)" :key="slide" class="col">
                                <slot></slot>
                            </div>
                        </div>
                    </div>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                slides: ['First', 'Second', 'First', 'Second', 'First', 'Second'],
            }
        },
        methods: {
            listCardForShow(number){
                let listCard = [];
                for(let i = 0; i < 3; i++){
                    if (this.slides[i + 3*number] !== undefined){
                        listCard[i] = this.slides[i + 3*number];
                    } else {
                        i = 3;
                    }
                }
                return listCard
            }
        }
    }
</script>

<style scoped lang="scss">
    .carousel-container{
        background-color: rgba(191,193,194, .8); 
        border-radius: 20px;
    }
    .carousel-sheet{
        overflow: auto; 
        background-color: rgba(0, 0, 0, 0);
    }
    .carousel-row{
        width: 80%; 
        height:100%; 
        display: flex; 
        align-items: center; 
        gap: 10px;
    }
</style>