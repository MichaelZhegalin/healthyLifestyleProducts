import { defineStore } from "pinia";
import { useFoodInfo } from "./foodInfoModule";

export const useUserInfo = defineStore('userInfoModule', {
    state: () => ({
        User: class {
            constructor(userInfo){
                this.userName = userInfo.userName;
                this.age = userInfo.age;
                this.height = userInfo.height;
                this.weight = userInfo.weight;
                this.gender = userInfo.gender;
                this.isActive = false;
                this.id = userInfo.id;
                this.foodInfo = undefined;
                this.needCalories = userInfo.needCalories;
                this.needPFC = userInfo.needPFC;
                this.eatCalories = {};
                this.eatPFC = {}
            }
        },
        users: {},
        activeUserId: '',
    }),
    getters: {},
    actions: {
        updateEatCalorieAndPFC(eatFood, deleteFood, date){
            let eatCalories = eatFood.calories;
            let eatProteins = eatFood.proteins;
            let eatFats = eatFood.fats;
            let eatCarbs = eatFood.carbs;

            let oldEatCalories = this.users[this.activeUserId]?.eatCalories[date] ?? 0;
            let oldEatProteins = this.users[this.activeUserId]?.eatPFC?.[date]?.proteins ?? 0;
            let oldEatFats = this.users[this.activeUserId]?.eatPFC?.[date]?.fats ?? 0;
            let oldEatCarbs = this.users[this.activeUserId]?.eatPFC?.[date]?.carbs ?? 0;

            if (deleteFood === false) {
                this.users[this.activeUserId].eatCalories[date] = oldEatCalories + eatCalories;
                this.users[this.activeUserId].eatPFC[date] = {
                    proteins: oldEatProteins + eatProteins,
                    fats: oldEatFats + eatFats,
                    carbs: oldEatCarbs + eatCarbs
                };
            } else {
                this.users[this.activeUserId].eatCalories[date] = oldEatCalories - eatCalories;
                this.users[this.activeUserId].eatPFC[date] = {
                    proteins: oldEatProteins - eatProteins,
                    fats: oldEatFats - eatFats,
                    carbs: oldEatCarbs - eatCarbs
                };
            }
        },
        setNewUser(userInfo){
            this.users[userInfo.id] = new this.User(userInfo);
        },
        setActiveUser(id){
            if (this.activeUserId !== '' && this.users[this.activeUserId] !== undefined) {
                this.users[this.activeUserId].isActive = false;
            }
            this.users[id].isActive = true;
            this.activeUserId = id;
            useFoodInfo().setActiveUserForFoodInfoModule(id);
        },
        setFoodInfo(foodInfo, activeUserId){
            if (this.users[activeUserId] !== undefined) {
                this.users[activeUserId].foodInfo = foodInfo;
            }
        },
        deleteUser(id){
            if (this.activeUserId === id) {
                this.activeUserId = '';
            }
            delete this.users[id];
        }
    }
})