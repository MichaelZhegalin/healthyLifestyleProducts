<template>
    <v-container>
        <my-dialog 
            v-model="isShowDialog" 
            @saveDialogForm="saveDialogForm" 
            @closeDialogForm="closeDialogForm"
        >
            <template #formBody>
                <add-eat-food-form
                    :dishWeight="dishWeight"
                    :foodNameProp="foodNameProp"
                    :foodNames="foodNames"
                    @setFoodName="setFoodName"
                    @setDishWeight="setDishWeight"
                />
            </template>
        </my-dialog>
        <v-row>
            <v-col cols="4" offset="4">
                <div class="bg-green-lighten-2 meal-header">
                    <h1 class="text-white">{{title}}</h1>
                </div>
            </v-col>
            <v-col class="mealPage_col-center" cols="12">
                <carousel :ObjWithInfo="ObjWithInfo">
                    <template v-slot:default="cardSlot">
                        <card-for-eat-food
                            :id="cardSlot.cardId"
                            :activeUser="activeUser"
                            :timesOfDay="`morning`"
                            :selectedDate="selectedDate"
                            :eatFood="ObjWithInfo"
                        />
                    </template>   
                </carousel>
            </v-col>
            <v-col class="mealPage_col-center" cols="12">
                <v-btn @click="showDialog" class="bg-green-lighten-2 text-white" size="x-large">Добавить</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Carousel from '../components/Carousel.vue';
    import CardForDay from '../components/cards/CardForDay.vue';
    import { useFoodInfo } from '@/store/foodInfoModule';
    import CardForEatFood from '@/components/cards/CardForEatFood.vue';
    import MyDialog from '@/components/dialog/MyDialog.vue';
    import AddEatFoodForm from '@/components/form/AddEatFoodForm.vue';
    export default {
        components: {Carousel, CardForDay, CardForEatFood, MyDialog, AddEatFoodForm},
        data(){
            return{
                title: undefined,
                ObjWithInfo: {},
                timesOfDay: '',
                activeUser: useFoodInfo().activeUser,
                selectedDate: useFoodInfo().selectedDate,
                foodNameProp: '',
                foodNames: ["Мужчина", "Женщина", "Мурло", "Миша", "Мужчина", "Женщина", "Мурло", "никита",],
                dishWeight: '',
                isShowDialog: false,
            }
        },
        methods:{
            setDishWeight(value){
                this.dishWeight = value;
            },
            setFoodName(value){
                this.foodNameProp = value;
            },
            showDialog(){
                this.isShowDialog = true;
            },
            saveDialogForm(){
                useFoodInfo().setMorningFood(
                    this.selectedDate,
                    {
                        foodName: this.foodNameProp,
                        calories: "324 кКал",
                        proteins: "12 г",
                        fats: "1 г",
                        carbs: "67 г",
                        dishWeight: this.dishWeight,
                        id: 2
                    },
                    Date.now()
                )
                this.dishWeight = '';
                this.setFoodName('');
            },
            closeDialogForm(){
                this.dishWeight = '';
                this.setFoodName('');
            }
        },
        mounted(){
            if (this.$route.params.meal.localeCompare('breakfast') === 0){
                this.title = 'Завтрак';
                this.ObjWithInfo = useFoodInfo().getMorningFood;
            }else if (this.$route.params.meal.localeCompare('lunch') === 0){
                this.title = 'Обед';
                this.ObjWithInfo = useFoodInfo().getAfternoonFood;
            } else {
                this.title = 'Ужин';
                this.ObjWithInfo = useFoodInfo().getEveningFood;
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