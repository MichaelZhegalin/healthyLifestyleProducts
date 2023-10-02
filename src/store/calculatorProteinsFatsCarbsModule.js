import { defineStore } from "pinia";
import { useUserInfo } from "./userInfoModule";

export const useCalculatorPFC = defineStore('calculatorProteinsFatsCabs', {
    state: () => ({
        calorie: 0,
        calorieWithPhysicalActivity: 0,
        realFoodCalorie: '',
        realFoodProteins: '',
        realFoodFats: '',
        realFoodCarbs: '',
    }),
    getters: {
        getPFC(){
            return {
                proteins: Math.floor(this.calorieWithPhysicalActivity * 0.3 / 4),
                fats: Math.floor(this.calorieWithPhysicalActivity * 0.3 / 9),
                carbs: Math.floor(this.calorieWithPhysicalActivity * 0.4 / 4)
            }
        },
        getRealСharacteristicsFood(){
            return {
                calorie: this.realFoodCalorie,
                proteins: this.realFoodProteins,
                fats: this.realFoodFats,
                carbs: this.realFoodCarbs
            }
        }
    },
    actions: {
        setCalorieCount(userInfo){
            const weight = userInfo.weight;
            const height = userInfo.height;
            const age = userInfo.age;

            if(userInfo.gender.localeCompare("Мужчина") === 0){
                this.calorie = 10 * weight + 6.25 * height - 5 * age + 5;
            } else{
                this.calorie = 10 * weight + 6.25 * height - 5 * age - 161;
            }
        },
        adjustmentForPhysicalActivity(physicalActivity){
            this.calorieWithPhysicalActivity = this.calorie * physicalActivity;
        },
        setRealСharacteristicsFood(foodInfo, eatFoodWeight){
            this.realFoodCalorie = foodInfo.calories / 100 * eatFoodWeight;
            this.realFoodProteins = foodInfo.proteins / 100 * eatFoodWeight;
            this.realFoodFats = foodInfo.fats / 100 * eatFoodWeight;
            this.realFoodCarbs = foodInfo.carbs / 100 * eatFoodWeight;
        }
    }
})