import { defineStore } from "pinia";
import { useUserInfo } from "./userInfoModule";

export const useFoodInfo = defineStore('foodInfo', {
    state: () => ({
        activeUser: '',
        selectedDate: '',
        foodInfo: {
            1: {
                name: "Arome Framboise",
                calories: "37 кКал",
                proteins: "4,3 г",
                fats: "0,1 г",
                carbs: "4,7 г",
                id: 1
            },
            2: {
                name: "Cannelloni",
                calories: "324 кКал",
                proteins: "12 г",
                fats: "1 г",
                carbs: "67 г",
                id: 2
            },
        },
        eatFoodInfo: {}
    }),
    getters: {},
    actions: {
        setEatFoodInfoForNewDay(date){
            if(this.eatFoodInfo[date] === undefined){
                this.eatFoodInfo[date] = {
                    morning: [],
                    afternoon: [],
                    evening: []
                }
            };
            this.selectedDate = date;
            console.log(this.eatFoodInfo, this.selectedDate);
        },
        setMorningFood(date, food){
            this.eatFoodInfo[date].morning.push(food);
            useUserInfo().setFoodInfo(this.eatFoodInfo[date], this.activeUser);
        },
        setAfternoonFood(date, food){
            this.eatFoodInfo[date].afternoon.push(food);
            useUserInfo().setFoodInfo(this.eatFoodInfo[date], this.activeUser);
        },
        setEveningFood(date, food){
            this.eatFoodInfo[date].evening.push(food);
            useUserInfo().setFoodInfo(this.eatFoodInfo[date], this.activeUser);
        },
        setActiveUserForFoodInfoModule(activeUserId){
            this.activeUser = activeUserId;
        }
    }
})