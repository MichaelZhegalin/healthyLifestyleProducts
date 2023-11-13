import { defineStore } from "pinia";
import { useUserInfo } from "./userInfoModule";
import { useCalculatorPFC } from "./calculatorProteinsFatsCarbsModule";
import { FoodConstuctor } from "./constructors/foodConstructor"
import food_base from "@/data/food_base"

export const useFoodInfo = defineStore('foodInfo', {
    state: () => ({
        isNormalizeData: localStorage.getItem('isNormalizeData') ?? false,
        activeUser: null,
        selectedDate: null,
        foods: JSON.parse(localStorage.getItem('foods')) ?? {},
        foodsForShow: {},
        eatFoodInfo: JSON.parse(localStorage.getItem('eatFoodInfo')) ?? {},
        counterAddFood: 0,
    }),
    getters: {
        getMorningFood(){
            return useUserInfo().users[this.activeUser]?.foodInfo?.[this.selectedDate]?.morning ?? {}
        },
        getAfternoonFood(){
            return useUserInfo().users[this.activeUser]?.foodInfo?.[this.selectedDate]?.afternoon ?? {}
        },
        getEveningFood(){
            return useUserInfo().users[this.activeUser]?.foodInfo?.[this.selectedDate]?.evening ?? {}
        },
    },
    actions: {
        normalizeData(){
            for(let i = 0; i < food_base.length; i++){
                food_base[i].foodName = food_base[i].name;
                food_base[i].calories = food_base[i].calories.split(" ")[0];
                food_base[i].proteins = food_base[i].proteins.split(" ")[0];
                food_base[i].fats = food_base[i].fats.split(" ")[0];
                food_base[i].carbs = food_base[i].carbs.split(" ")[0];
                if (food_base[i].calories.includes(",")) {
                    food_base[i].calories = food_base[i].calories.split(",")[0] + "." + food_base[i].calories.split(",")[1];
                }
                if (food_base[i].proteins.includes(",")) {
                    food_base[i].proteins = food_base[i].proteins.split(",")[0] + "." + food_base[i].proteins.split(",")[1];
                }
                if (food_base[i].fats.includes(",")) {
                    food_base[i].fats = food_base[i].fats.split(",")[0] + "." + food_base[i].fats.split(",")[1];
                }
                if (food_base[i].carbs.includes(",")) {
                    food_base[i].carbs = food_base[i].carbs.split(",")[0] + "." + food_base[i].carbs.split(",")[1];
                }
                food_base[i].id = Date.now() - i * 10;

                delete food_base[i].name;
            }
            this.isNormalizeData = true;
            localStorage.setItem('foods', JSON.stringify(this.foods));
            localStorage.setItem('isNormalizeData', true);
        },
        setJSONFoodBase(){
            for(let i = 0; i < food_base.length; i++){
                this.setNewFood(food_base[i]);
            }
        },
        setShowFood(){
            this.counterAddFood = 0;
            this.foodsForShow = {};
            for(let i = 0; i < 10; i++){
                let id = Object.keys(this.foods)[i];
                this.foodsForShow[id] = this.foods[id];
            }
        },
        setShowFoodNext(){
            this.counterAddFood += 10;
            this.foodsForShow = {};
            for(let i = 0; i < 10; i++){
                let id = Object.keys(this.foods)[i + this.counterAddFood];
                this.foodsForShow[id] = this.foods[id];
            }
        },
        setShowFoodBack(){
            if (this.counterAddFood !== 0) {
                this.counterAddFood -= 10;
            }
            this.foodsForShow = {};
            for(let i = 0; i < 10; i++){
                let id = Object.keys(this.foods)[i + this.counterAddFood];
                this.foodsForShow[id] = this.foods[id];
            }
        },
        setNewFood(foodInfo){
            this.foods[foodInfo.id] = new FoodConstuctor(foodInfo);
            localStorage.setItem('foods', JSON.stringify(this.foods));
        },
        deleteFood(id){
            delete this.foods[id];
            localStorage.setItem('foods', JSON.stringify(this.foods));
        },
        setEatFoodInfoForNewDay(date){
            if (this.eatFoodInfo[date] === undefined) {
                this.eatFoodInfo = {};
                this.eatFoodInfo[date] = {
                    morning: {},
                    afternoon: {},
                    evening: {}
                }
            } else {
                this.eatFoodInfo[date] = useUserInfo()?.users?.[this.activeUser]?.foodInfo?.[date] 
                ??
                {
                    morning: {},
                    afternoon: {},
                    evening: {}
                };
            }
            this.selectedDate = date;
            localStorage.setItem('eatFoodInfo', JSON.stringify(this.eatFoodInfo));
        },
        setMorningFood(date, food, id, eatFoodWeight){
            food = this.workWithRealCharacteristicsFood(food, eatFoodWeight)

            this.eatFoodInfo[date].morning[id] = food;

            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
            useUserInfo().updateEatCalorieAndPFC(this.eatFoodInfo[date].morning[id], false, date);
            localStorage.setItem('eatFoodInfo', JSON.stringify(this.eatFoodInfo));
        },
        setAfternoonFood(date, food, id, eatFoodWeight){
            food = this.workWithRealCharacteristicsFood(food, eatFoodWeight)

            this.eatFoodInfo[date].afternoon[id] = food;
            
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
            useUserInfo().updateEatCalorieAndPFC(this.eatFoodInfo[date].afternoon[id], false, date);
            localStorage.setItem('eatFoodInfo', JSON.stringify(this.eatFoodInfo));
        },
        setEveningFood(date, food, id, eatFoodWeight){
            food = this.workWithRealCharacteristicsFood(food, eatFoodWeight)

            this.eatFoodInfo[date].evening[id] = food;
            
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
            useUserInfo().updateEatCalorieAndPFC(this.eatFoodInfo[date].evening[id], false, date);
            localStorage.setItem('eatFoodInfo', JSON.stringify(this.eatFoodInfo));
        },
        deleteEatFood(date, timesOfDay, eatFoodId){
            useUserInfo().updateEatCalorieAndPFC(this.eatFoodInfo[date][timesOfDay][eatFoodId], true, date);
            delete this.eatFoodInfo[date][timesOfDay][eatFoodId];
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
            localStorage.setItem('eatFoodInfo', JSON.stringify(this.eatFoodInfo));
        },
        setActiveUserForFoodInfoModule(activeUserId){
            this.activeUser = activeUserId;
            this.eatFoodInfo = useUserInfo().users[activeUserId].foodInfo ?? []
        },
        workWithRealCharacteristicsFood(food, eatFoodWeight){
            useCalculatorPFC().setRealСharacteristicsFood(food, eatFoodWeight);

            let realСharacteristicsFood = useCalculatorPFC().getRealСharacteristicsFood;

            food.calories = Number(realСharacteristicsFood.calorie.toFixed(2));
            food.proteins = Number(realСharacteristicsFood.proteins.toFixed(2));
            food.fats = Number(realСharacteristicsFood.fats.toFixed(2));
            food.carbs = Number(realСharacteristicsFood.carbs.toFixed(2));
            food.weight = eatFoodWeight;

            return food
        }
    }
})