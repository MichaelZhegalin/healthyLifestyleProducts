<template>
    <v-container>
        <my-dialog 
            v-model="isShowDialog" 
            @saveDialogForm="saveDialogForm" 
            @closeDialogForm="closeDialogForm"
        >
            <template #formBody>
                <add-food-form
                    :foodName="foodName"
                    :calories="calories"
                    :proteins="proteins"
                    :fats="fats"
                    :carbs="carbs"
                    @setFoodName="setFoodName"
                    @setCalories="setCalories"
                    @setProteins="setProteins"
                    @setFats="setFats"
                    @setCarbs="setCarbs"
                />
            </template>
        </my-dialog>
        <v-row class="d-flex justify-center align-center py-3">
            <food-page-navbar
                @setSearchFood="setSearchFood"
                :searchFoodProp="searchFood"
            />
        </v-row>
        <v-row>
            <v-container>
                <v-row v-for="slide in slides" :key="slide">
                    <v-col>
                        <card-for-food :id="slide"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-center align-center">
                <v-btn @click="setShowFoodBack">Назад</v-btn>
            </v-col>
            <v-col class="d-flex justify-center align-center">
                <v-btn @click="showDialog" class="bg-green-lighten-2 text-white" size="x-large">Добавить</v-btn>
            </v-col>
            <v-col class="d-flex justify-center align-center">
                <v-btn @click="setShowFoodNext">Вперед</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CardForFood from '@/components/cards/CardForFood.vue'
    import FoodPageNavbar from '@/components/FoodPageNavbar.vue'
    import MyDialog from '@/components/dialog/MyDialog.vue'
    import AddFoodForm from '@/components/form/AddFoodForm.vue'
    import { useFoodInfo } from '@/store/foodInfoModule'

    export default {
        components: { CardForFood, FoodPageNavbar, MyDialog, AddFoodForm },
        data(){
            return{
                isShowDialog: false,
                foodName: '',
                calories: '',
                proteins: '',
                fats: '',
                carbs: '',
                searchFood: '',
                objWithInfoAboutFoods: {}
            }
        },
        methods:{
            setSearchFood(value){
                this.searchFood = value;
                if (value === '') {
                    this.objWithInfoAboutFoods = {}
                    this.copyObject(useFoodInfo().foodsForShow, this.objWithInfoAboutFoods);
                } else {
                    value = value.toLowerCase();
                    for(let key in useFoodInfo().foods){
                        if (useFoodInfo().foods[key].foodName.toLowerCase().includes(`${value}`)) {
                            if(Object.keys(this.objWithInfoAboutFoods).length < 10){
                                this.objWithInfoAboutFoods[key] = useFoodInfo().foods[key];
                            }
                        } else {
                            delete this.objWithInfoAboutFoods[key];
                        }
                    }
                }
            },
            setFoodName(value){
                this.foodName = value;
            },
            setCalories(value){
                this.calories = value;
            },
            setProteins(value){
                this.proteins = value;
            },
            setFats(value){
                this.fats = value;
            },
            setCarbs(value){
                this.carbs = value;
            },
            setShowFoodNext(){
                useFoodInfo().setShowFoodNext();
                this.objWithInfoAboutFoods = {};
                this.copyObject(useFoodInfo().foodsForShow, this.objWithInfoAboutFoods);
            },
            setShowFoodBack(){
                useFoodInfo().setShowFoodBack();
                this.objWithInfoAboutFoods = {};
                this.copyObject(useFoodInfo().foodsForShow, this.objWithInfoAboutFoods);
            },
            showDialog(){
                this.isShowDialog = true;
            },
            saveDialogForm(){
                useFoodInfo().setNewFood({
                    foodName: this.foodName,
                    calories: this.calories,
                    proteins: this.proteins,
                    fats: this.fats,
                    carbs: this.carbs,
                    id: Date.now()
                })
                this.foodName = '';
                this.calories = '';
                this.proteins = '';
                this.fats = '';
                this.carbs = '';
            },
            closeDialogForm(){
                this.foodName = '';
                this.calories = '';
                this.proteins = '';
                this.fats = '';
                this.carbs = '';
            },
            copyObject(copiedObj, finishObj){
                for(let key in copiedObj){
                    finishObj[key] = copiedObj[key];
                }
                return finishObj
            }
        },
        computed:{
            slides:{
                get(){
                    return Object.keys(this.objWithInfoAboutFoods);
                }
            },
            observerOfFoods: {
                get(){
                    return Object.keys(useFoodInfo().foods).length
                }
            }
        },
        watch: {
            observerOfFoods(){
                this.searchFood = '';
                this.objWithInfoAboutFoods = {}
                useFoodInfo().setShowFood();
                this.copyObject(useFoodInfo().foodsForShow, this.objWithInfoAboutFoods);
            }
        },
        mounted(){
            useFoodInfo().setShowFood();
            for(let key in useFoodInfo().foodsForShow){
                this.objWithInfoAboutFoods[key] = useFoodInfo().foodsForShow[key]
            }
        }
    }
</script>