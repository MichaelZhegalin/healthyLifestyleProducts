<template>
    <charts
        chartsTitleOne = "Необходимо калорий"
        chartsTitleTwo = "Потреблено калорий"
        :requiredCharacteristics="requiredCalories"
        :obtainedCharacteristics="eatCalories"
        :date="date"
        canvasId="myChart1"
    />
    <charts
        chartsTitleOne = "Необходимо белков"
        chartsTitleTwo = "Потреблено белков"
        :requiredCharacteristics="requiredProteins"
        :obtainedCharacteristics="eatProteins"
        :date="date"
        canvasId="myChart2"
    />
    <charts
        chartsTitleOne = "Необходимо жиров"
        chartsTitleTwo = "Потреблено жиров"
        :requiredCharacteristics="requiredFats"
        :obtainedCharacteristics="eatFats"
        :date="date"
        canvasId="myChart3"
    />
    <charts
        chartsTitleOne = "Необходимо углеводов"
        chartsTitleTwo = "Потреблено углеводов"
        :requiredCharacteristics="requiredCarbs"
        :obtainedCharacteristics="eatCarbs"
        :date="date"
        canvasId="myChart4"
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
            eatProteins: [],
            requiredProteins: [],
            eatFats: [],
            requiredFats: [],
            eatCarbs: [],
            requiredCarbs: [],
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

            for(let i = 0; i < 7; i++){
                weekDate[i] = date.getDate();
                this.requiredCalories[i] = useUserInfo().users[useUserInfo().activeUserId].needCalories;
                this.eatCalories[i] = useUserInfo().users[aciveUserId].eatCalories[`${weekDate[i]}${month}${year}`];

                console.log(useUserInfo().users[aciveUserId].eatPFC[`${weekDate[i]}${month}${year}`])

                this.requiredProteins[i] = useUserInfo().users[useUserInfo().activeUserId].needPFC.proteins;
                this.eatProteins[i] = useUserInfo().users[aciveUserId].eatPFC[`${weekDate[i]}${month}${year}`]?.proteins;

                this.requiredFats[i] = useUserInfo().users[useUserInfo().activeUserId].needPFC.fats;
                this.eatFats[i] = useUserInfo().users[aciveUserId].eatPFC[`${weekDate[i]}${month}${year}`]?.fats;

                this.requiredCarbs[i] = useUserInfo().users[useUserInfo().activeUserId].needPFC.carbs;
                this.eatCarbs[i] = useUserInfo().users[aciveUserId].eatPFC[`${weekDate[i]}${month}${year}`]?.carbs;
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
                this.requiredCalories[dayCounter] = useUserInfo().users[useUserInfo().activeUserId]?.needCalories;
                this.eatCalories[dayCounter] = useUserInfo().users[aciveUserId]?.eatCalories[`${monthDate[dayCounter]}${month}${year}`];
                date.setDate(date.getDate() + 1);
                dayCounter += 1;
            }

            return monthDate
        }
    },
    mounted(){
        this.date = this.getCurrentDaysOfWeek();
    }
}
</script>

<style>

</style>