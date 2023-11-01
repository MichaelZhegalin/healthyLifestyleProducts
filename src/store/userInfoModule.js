import { defineStore } from "pinia";
import { useFoodInfo } from "./foodInfoModule";
import { UserConstructor } from "./constructors/userConstructor"

export const useUserInfo = defineStore('userInfoModule', {
    state: () => ({
        users: JSON.parse(localStorage.getItem('users')) ?? {},
        activeUserId: '',
    }),
    actions: {
        saveToLocalStorage(){
            if (this.activeUserId !== '') {
                this.users[this.activeUserId].isActive = false;
                localStorage.setItem('users', JSON.stringify(this.users));
                this.users[this.activeUserId].isActive = true;
            } else {
                localStorage.setItem('users', JSON.stringify(this.users));
            }
        },
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
            this.saveToLocalStorage();
        },
        setNewUser(userInfo){
            this.users[userInfo.id] = new UserConstructor(userInfo);
            this.saveToLocalStorage();
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
                this.saveToLocalStorage();
            }
        },
        deleteUser(id){
            if (this.activeUserId === id) {
                this.activeUserId = '';
            }
            delete this.users[id];
            this.saveToLocalStorage();
        }
    }
})