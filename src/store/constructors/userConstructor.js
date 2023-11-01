export class UserConstructor {
    constructor(userInfo){
        this.userName = userInfo.userName;
        this.age = userInfo.age;
        this.height = userInfo.height;
        this.weight = userInfo.weight;
        this.gender = userInfo.gender;
        this.isActive = false;
        this.id = userInfo.id;
        this.foodInfo = null;
        this.needCalories = userInfo.needCalories;
        this.needPFC = userInfo.needPFC;
        this.eatCalories = {};
        this.eatPFC = {}
    }
}