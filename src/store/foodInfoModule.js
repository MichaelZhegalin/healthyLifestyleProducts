import { defineStore } from "pinia";
import { useUserInfo } from "./userInfoModule";
import { useCalculatorPFC } from "./calculatorProteinsFatsCarbsModule";

export const useFoodInfo = defineStore('foodInfo', {
    state: () => ({
        Food: class {
            constructor(foodInfo){
                this.foodName = foodInfo.foodName;
                this.calories = foodInfo.calories;
                this.proteins = foodInfo.proteins;
                this.fats = foodInfo.fats;
                this.carbs = foodInfo.carbs;
                this.id = foodInfo.id;
            }
        },
        activeUser: '',
        selectedDate: '',
        foods: {
            1: {
                foodName: "Arome Framboise",
                calories: "37 кКал",
                proteins: "4,3 г",
                fats: "0,1 г",
                carbs: "4,7 г",
                id: 1
            },
            2: {
                foodName: "Cannelloni",
                calories: "324 кКал",
                proteins: "12 г",
                fats: "1 г",
                carbs: "67 г",
                id: 2
            },
        },
        eatFoodInfo: {}
    }),
    getters: {
        getMorningFood(){
            return useUserInfo().users[this.activeUser]?.foodInfo[this.selectedDate].morning??{}
        },
        getAfternoonFood(){
            return useUserInfo().users[this.activeUser]?.foodInfo[this.selectedDate].afternoon??{}
        },
        getEveningFood(){
            return useUserInfo().users[this.activeUser]?.foodInfo[this.selectedDate].evening??{}
        },
    },
    actions: {
        setNewFood(foodInfo){
            this.foods[foodInfo.id] = new this.Food(foodInfo);
        },
        deleteFood(id){
            delete this.foods[id];
        },
        setEatFoodInfoForNewDay(date){
            if(this.eatFoodInfo[date] === undefined){
                this.eatFoodInfo = {};
                this.eatFoodInfo[date] = {
                    morning: {},
                    afternoon: {},
                    evening: {}
                }
                console.log("да что за дела", this.eatFoodInfo)
            } else {
                this.eatFoodInfo[date] = useUserInfo().users[this.activeUser].foodInfo[date];
            }
            this.selectedDate = date;
        },
        setMorningFood(date, food, id, eatFoodWeight){
            useCalculatorPFC().setRealСharacteristicsFood(food, eatFoodWeight);
            let realСharacteristicsFood = useCalculatorPFC().getRealСharacteristicsFood;
            food.calories = realСharacteristicsFood.calorie;
            food.proteins = realСharacteristicsFood.proteins;
            food.fats = realСharacteristicsFood.fats;
            food.carbs = realСharacteristicsFood.carbs;
            food.weight = eatFoodWeight;
            this.eatFoodInfo[date].morning[id] = food;
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
            useUserInfo().updateEatCalorieAndPFC(this.eatFoodInfo[date].morning[id], false, date);
        },
        setAfternoonFood(date, food, id){
            this.eatFoodInfo[date].afternoon[id] = food;
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
        },
        setEveningFood(date, food, id){
            this.eatFoodInfo[date].evening[id] = food;
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
        },
        deleteEatFood(date, timesOfDay, eatFoodId){
            useUserInfo().updateEatCalorieAndPFC(this.eatFoodInfo[date][timesOfDay][eatFoodId], true, date);
            delete this.eatFoodInfo[date][timesOfDay][eatFoodId];
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
        },
        setActiveUserForFoodInfoModule(activeUserId){
            this.activeUser = activeUserId;
            this.eatFoodInfo = useUserInfo().users[activeUserId].foodInfo??[]
        }
    }
})