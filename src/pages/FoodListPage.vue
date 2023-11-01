<template>
    <v-container>
        <form-dialog 
            v-model="isShowDialog" 
            @saveDialogForm="saveDialogForm" 
            @closeDialogForm="closeDialogForm"
            :btnVisible="true"
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
        </form-dialog>
        <v-row class="d-flex justify-center align-center py-3">
            <food-page-navbar
                @setSearchFood="setSearchFood"
                :searchFoodProp="searchFood"
                @setSortFood="setSortFood"
                :sortFoodProp="sortFood"
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
    import FormDialog from '@/components/dialog/FormDialog.vue'
    import AddFoodForm from '@/components/form/AddFoodForm.vue'
    import { useFoodInfo } from '@/store/foodInfoModule'

    export default {
        components: { CardForFood, FoodPageNavbar, FormDialog, AddFoodForm },
        data(){
            return{
                isShowDialog: false,
                foodName: '',
                calories: '',
                proteins: '',
                fats: '',
                carbs: '',
                searchFood: '',
                sortFood: null,
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
                        if(useFoodInfo().foods[key].foodName.toLowerCase().localeCompare(`${value}`) === 0){
                            this.objWithInfoAboutFoods = {};
                            this.objWithInfoAboutFoods[key] = useFoodInfo().foods[key];
                        }
                    }      
                }
            },
            setSortFood(value){
                this.sortFood = value;
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
                if (
                    this.foodName !== '' && 
                    this.calories !== '' && 
                    this.proteins !== '' && 
                    this.carbs !== '' && 
                    this.fats !== ''
                ) {
                    useFoodInfo().setNewFood({
                        foodName: this.foodName,
                        calories: this.calories,
                        proteins: this.proteins,
                        fats: this.fats,
                        carbs: this.carbs,
                        id: Date.now()
                    })
                } else {
                    alert("Вы не заполнили форму!");
                }
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
            },
            sortFood(){
                let sortValue = {
                    'Калориям': 'calories',
                    'Белкам': 'proteins',
                    'Жирам': 'fats',
                    'Углеводам': 'carbs',
                }
                let keysForSort = Object.keys(useFoodInfo().foods)
                let sortFoodObj = {}
                let counter = 0;
                
                keysForSort.sort((a, b) =>
                    useFoodInfo().foods[b][`${sortValue[this.sortFood]}`] - useFoodInfo().foods[a][`${sortValue[this.sortFood]}`]);
                for(let key in useFoodInfo().foods){
                    sortFoodObj[key] = useFoodInfo().foods[keysForSort[counter]];
                    counter += 1;
                }
                for(let key in sortFoodObj){
                    useFoodInfo().foods[key] = sortFoodObj[key];
                }
                this.objWithInfoAboutFoods = {}
                setTimeout(() =>{
                    useFoodInfo().setShowFood();
                    this.copyObject(useFoodInfo().foodsForShow, this.objWithInfoAboutFoods);
                }, 0)
                
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