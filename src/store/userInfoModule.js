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
            }
        },
        users: {
            1: {
                userName: "Миша",
                age: 22,
                height: 180,
                weight: 65,
                gender: "Мужчина",
                isActive: false,
                id: 1,
                foodInfo: undefined,
            }
        },
        prevActiveUserId: '',
    }),
    getters: {},
    actions: {
        setNewUser(userInfo){
            this.users[userInfo.id] = new this.User(userInfo);
        },
        setActiveUser(id){
            if(this.prevActiveUserId !== ''){
                this.users[this.prevActiveUserId].isActive = false;
            }
            this.users[id].isActive = true;
            this.prevActiveUserId = id;
            useFoodInfo().setActiveUserForFoodInfoModule(id);
        },
        setFoodInfo(foodInfo, activeUserId){
            this.users[activeUserId].foodInfo = foodInfo;
        },
        deleteUser(id){
            delete this.users[id];
        }
    }
})