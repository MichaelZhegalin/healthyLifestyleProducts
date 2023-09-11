<template>
    <div class="carousel-container">
        <v-carousel
            height="400"
            hide-delimiters
            show-arrows="hover"
        >
            <v-carousel-item v-for="i in Math.ceil(slides.length/3)" :key="i">
                <v-sheet class="carousel-sheet fill-height">
                    <v-container class="fill-height">
                        <v-row justify="center" align="center">
                            <v-col :cols="cols" v-for="slide in listCardForShow(i - 1)" :key="slide">
                                <slot></slot>
                            </v-col>
                        </v-row>
                    </v-container>
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
        },
        computed: {
            cols() {
                const { lg, md } = this.$vuetify.display
                return lg ? 4 : md ? 4 : 12
            },
        },
    }
</script>

<style scoped lang="scss">
    .carousel-container{
        max-width: 55rem;
    }
    .carousel-sheet{
        overflow: auto; 
        background-color: rgba(0, 0, 0, 0);
    }
</style>