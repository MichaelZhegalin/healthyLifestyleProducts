import { defineStore } from "pinia";
import { useUserInfo } from "./userInfoModule";

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
            return this.eatFoodInfo[this.selectedDate].morning
        },
        getAfternoonFood(){
            return this.eatFoodInfo[this.selectedDate].afternoon
        },
        getEveningFood(){
            return this.eatFoodInfo[this.selectedDate].evening
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
                this.eatFoodInfo[date] = {
                    morning: {},
                    afternoon: {},
                    evening: {}
                }
            };
            this.selectedDate = date;
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
        },
        setMorningFood(date, food, id){
            this.eatFoodInfo[date].morning[id] = food;
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
        },
        setAfternoonFood(date, food){
            this.eatFoodInfo[date].afternoon[id] = food;
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
        },
        setEveningFood(date, food){
            this.eatFoodInfo[date].evening[id] = food;
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
        },
        deleteEatFood(date, timesOfDay, eatFoodId){
            delete this.eatFoodInfo[date][timesOfDay][eatFoodId];
            useUserInfo().setFoodInfo(this.eatFoodInfo, this.activeUser);
        },
        setActiveUserForFoodInfoModule(activeUserId){
            this.activeUser = activeUserId;
        }
    }
})