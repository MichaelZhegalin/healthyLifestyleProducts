<template>
    <charts
        chartsTitleOne = "Необходимо калорий"
        chartsTitleTwo = "Потреблено калорий"
        :requiredCharacteristics="requiredCalories"
        :obtainedCharacteristics="eatCalories"
        :date="date"
    />
</template>

<script>
import Charts from '@/components/Charts.vue'
import { useUserInfo } from '@/store/userInfoModule'
export default {
    components: {Charts},
    data(){
        return{
            eatCalories: [],
            requiredCalories: [],
            // needProteins: useUserInfo().users[useUserInfo().activeUserId].needPFC.proteins,
            // // eatProteins: ,
            // needFats: useUserInfo().users[useUserInfo().activeUserId].needPFC.fats,
            // // eatFats: ,
            // needCarbs: useUserInfo().users[useUserInfo().activeUserId].needPFC.carbs,
            // eatCarbs: ,
            date: undefined,
        }
    },
    methods: {
        getCurrentDaysOfWeek(){
            const year = new Date().getFullYear();
            let month = new Date().getMonth();
            let date = new Date(year, month);
            let weekDate = [];
            let aciveUserId = useUserInfo().activeUserId;
            let saveDateForCheck = date.getDate();
            date.setDate(date.getDate() - 3);
            if(date.getDate() > saveDateForCheck){
                month -= 1;
            }
            console.log("чтооо", useUserInfo().users[useUserInfo().activeUserId], useUserInfo().activeUserId)

            for(let i = 0; i < 7; i++){
                weekDate[i] = date.getDate();
                this.requiredCalories[i] = useUserInfo().users[useUserInfo().activeUserId].needCalories;
                this.eatCalories[i] = useUserInfo().users[aciveUserId].eatCalories[`${weekDate[i]}${month}${year}`];
                date.setDate(date.getDate() + 1);
                if(date.getDate() < weekDate[i]){
                    month += 1;
                }
            }
            return weekDate
        },
        getCurrentDaysOfMonth(){
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            let date = new Date(year, month);
            let aciveUserId = useUserInfo().activeUserId;
            let monthDate = [];
            let dayCounter = 0;

            while(date.getMonth() === month){
                monthDate[dayCounter] = date.getDate();
                this.requiredCalories[dayCounter] = useUserInfo().users[useUserInfo().activeUserId].needCalories;
                this.eatCalories[dayCounter] = useUserInfo().users[aciveUserId].eatCalories[`${monthDate[dayCounter]}${month}${year}`];
                date.setDate(date.getDate() + 1);
                dayCounter += 1;
            }

            return monthDate
        }
    },
    mounted(){
        this.date = this.getCurrentDaysOfMonth();
    }
}
</script>

<style>

</style>