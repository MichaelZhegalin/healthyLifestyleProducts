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
        <v-row>
            <v-col cols="12">
                <food-page-navbar/>
            </v-col>
            <v-col cols="12">
                <v-container>
                    <v-row v-for="slide in slides" :key="slide">
                        <v-col>
                            <card-for-food :id="slide"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col class="d-flex justify-center" cols="12">
                <v-btn @click="showDialog" class="bg-green-lighten-2 text-white" size="x-large">Добавить</v-btn>
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
    }
  },
  methods:{
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
    }
  },

  computed:{
    slides:{
        get(){
            return Object.keys(useFoodInfo().foods);
        }
    }
  }
}
</script>

<style>

</style>