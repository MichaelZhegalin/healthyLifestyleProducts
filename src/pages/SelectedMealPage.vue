<template>
    <v-container>
        <form-dialog 
            v-model="isShowDialog" 
            @saveDialogForm="saveDialogForm" 
            @closeDialogForm="closeDialogForm"
            :btnVisible="true"
        >
            <template #formBody>
                <add-eat-food-form
                    :eatFoodInfo="eatFoodInfo"
                />
            </template>
        </form-dialog>
        <v-row>
            <v-col cols="4" offset="4">
                <div class="bg-green-lighten-2 meal-header">
                    <h1 class="text-white">{{title}}</h1>
                </div>
            </v-col>
            <v-col class="mealPage_col-center" cols="12">
                <carousel :objWithInfoProp="infoAboutEatFood">
                    <template v-slot:default="cardSlot">
                        <card-for-eat-food
                            :id="cardSlot.cardId"
                            :timesOfDay="timesOfDay"
                            :selectedDate="selectedDate"
                            :eatFood="infoAboutEatFood"
                            :imageURL="imageURL"
                        />
                    </template>   
                </carousel>
            </v-col>
            <v-col class="mealPage_col-center" cols="12">
                <v-btn 
                    @click="showDialog" 
                    class="bg-green-lighten-2 text-white" 
                    size="x-large"
                >
                    Добавить
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Carousel from '../components/Carousel.vue';
    import CardForDay from '../components/cards/CardForDay.vue';
    import { useFoodInfo } from '@/store/foodInfoModule';
    import CardForEatFood from '@/components/cards/CardForEatFood.vue';
    import FormDialog from '@/components/dialog/FormDialog.vue';
    import AddEatFoodForm from '@/components/form/AddEatFoodForm.vue';

    export default {
        components: {Carousel, CardForDay, CardForEatFood, FormDialog, AddEatFoodForm},
        data(){
            return{
                title: null,
                timesOfDay: null,
                timesOfDayForGetters: null,
                timesOfDayForSet: null,
                activeUser: useFoodInfo().activeUser,
                selectedDate: useFoodInfo().selectedDate,
                foodId: [],
                eatFoodInfo: {
                    foodNames: [],
                    foodName: '',
                    dishWeight: ''
                },
                isShowDialog: false,
                imageURL: null
            }
        },
        methods:{
            showDialog(){
                this.isShowDialog = true;
            },
            saveDialogForm(){
                let userSelectedFood = {};
                let checkExistsFood = false;
                for(let i = 0; i < this.eatFoodInfo.foodNames.length; i++){
                    if (this.eatFoodInfo.foodNames[i].localeCompare(this.eatFoodInfo.foodName) === 0) {
                        for(let key in useFoodInfo().foods[this.foodId[i]]){
                            userSelectedFood[key] = useFoodInfo().foods[this.foodId[i]][key];
                            checkExistsFood = true;
                        }
                    }
                }
                if (checkExistsFood && this.eatFoodInfo.dishWeight !== '') {
                    useFoodInfo()[this.timesOfDayForSet](
                        this.selectedDate,
                        userSelectedFood,
                        Date.now(),
                        this.eatFoodInfo.dishWeight
                    )
                } else if (this.eatFoodInfo.dishWeight !== '') {
                    alert("Выбранное блюдо не найдено");
                } else if (!!Number(this.eatFoodInfo.dishWeight) && Number(this.eatFoodInfo.dishWeight) >= 0) {
                    alert("Массу блюда необходимо вводить числами больше нуля!")
                } else {
                    alert("Вы не ввели массу блюда!");
                }
                this.eatFoodInfo.dishWeight = '';
                this.eatFoodInfo.foodName = '';
            },
            closeDialogForm(){
                this.eatFoodInfo.dishWeight = '';
                this.eatFoodInfo.foodName = '';
            }
        },
        mounted(){
            if (this.$route.params.meal.localeCompare('breakfast') === 0) {
                this.title = 'Завтрак';
                this.timesOfDay = 'morning'
                this.timesOfDayForGetters = 'getMorningFood'
                this.timesOfDayForSet = 'setMorningFood'
                this.imageURL="/src/img/breakfast.jpg"
            } else if (this.$route.params.meal.localeCompare('lunch') === 0) {
                this.title = 'Обед';
                this.timesOfDay = 'afternoon'
                this.timesOfDayForGetters = 'getAfternoonFood'
                this.timesOfDayForSet = 'setAfternoonFood'
                this.imageURL="/src/img/lunch.jpg"
            } else {
                this.title = 'Ужин';
                this.timesOfDay = 'evening'
                this.timesOfDayForGetters = 'getEveningFood'
                this.timesOfDayForSet = 'setEveningFood'
                this.imageURL="/src/img/dinner.jpg"
            }
            for(let key in useFoodInfo().foods){
                this.eatFoodInfo.foodNames.push(useFoodInfo().foods[key].foodName);
                this.foodId.push(key);
            }
        },
        computed:{
            infoAboutEatFood:{
                get(){
                    if (this.timesOfDayForGetters !== null) {
                        return useFoodInfo()[`${this.timesOfDayForGetters}`];
                    } else {
                        return {}
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .meal-header{
        border-radius: 10px; 
        display: flex; 
        justify-content: center;
    }
    .mealPage_col-center{
        display: flex;
        justify-content: center;
    }
</style>