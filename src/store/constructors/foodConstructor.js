export class FoodConstuctor {
    constructor(foodInfo){
        this.foodName = foodInfo.foodName;
        this.calories = foodInfo.calories;
        this.proteins = foodInfo.proteins;
        this.fats = foodInfo.fats;
        this.carbs = foodInfo.carbs;
        this.id = foodInfo.id;
    }
}