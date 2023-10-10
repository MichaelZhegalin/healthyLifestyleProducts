<template>
    <div class="carousel-container">
        <v-carousel
            v-if="objWithInfo.length !== 0"
            height="430"
            hide-delimiters
            show-arrows="hover"
        >
            <v-carousel-item v-for="i in Math.ceil(objWithInfo.length/3)" :key="i">
                <v-sheet class="carousel-sheet fill-height">
                    <v-container class="fill-height">
                        <v-row justify="center" align="center">
                            <v-col :cols="cols" v-for="slide in listCardForShow(i - 1)" :key="slide">
                                <slot :cardId="slide"></slot>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
        <div v-else>
            Пока нет информации
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            objWithInfoProp: Object,
        },
        data() {
            return {
                slides: [],
                saveNumber: undefined
            }
        },
        methods: {
            listCardForShow(number){
                let listCard = [];
                this.saveNumber = number
                for(let i = 0; i < 3; i++){
                    if (this.slides[i + 3*number] !== undefined) {
                        listCard[i] = this.slides[i + 3*number];
                    } else {
                        i = 3;
                    }
                }
                return listCard;
            }
        },
        computed: {
            cols() {
                const { lg, md, sm } = this.$vuetify.display;
                return lg ? 4 * 4 - this.listCardForShow(this.saveNumber).length 
                       : md ? 4 * 4 - this.listCardForShow(this.saveNumber).length 
                       : 12;
            },
            objWithInfo: {
                get(){
                    this.slides = Object.keys(this.objWithInfoProp);
                    return Object.keys(this.objWithInfoProp);
                },
            }
        },
    }
</script>

<style scoped lang="scss">
    .carousel-container{
        max-width: 65rem;
    }
    .carousel-sheet{
        overflow: auto; 
        background-color: rgba(0, 0, 0, 0);
    }
</style>