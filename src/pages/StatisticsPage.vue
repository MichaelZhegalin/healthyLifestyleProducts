<template>
    <v-container>
        <v-row>
            <v-col class="d-flex justify-center">
                <charts
                    chartsTitleOne = "Потреблено калорий"
                    chartsTitleTwo = "Необходимо калорий"
                    canvasId="myChart1"
                    ref="chartsCalories"
                />
            </v-col>
            <v-col class="d-flex justify-center">
                <charts
                    chartsTitleOne = "Потреблено белков"
                    chartsTitleTwo = "Необходимо белков"
                    canvasId="myChart2"
                    ref="chartsProteins"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-center">
                <charts
                    chartsTitleOne = "Потреблено жиров"
                    chartsTitleTwo = "Необходимо жиров"
                    :requiredCharacteristics="requiredFats"
                    :obtainedCharacteristics="eatFats"
                    :date="date"
                    canvasId="myChart3"
                    ref="chartsFats"
                />
            </v-col>
            <v-col class="d-flex justify-center">
                <charts
                    chartsTitleOne = "Потреблено углеводов"
                    chartsTitleTwo = "Необходимо углеводов"
                    canvasId="myChart4"
                    ref="chartsCarbs"
                />
            </v-col>
        </v-row>
        <v-row class="d-flex justify-space-between">
            <v-col class="d-flex justify-center">
                <v-btn @click="isWeekShowStatistics">Статистика за неделю</v-btn>
            </v-col>
            <v-col class="d-flex justify-center">
                <v-btn @click="isWeekShowStatistics">Статистика за произвольный промежуток</v-btn>
            </v-col>
            <v-col class="d-flex justify-center">
                <v-btn @click="isMonthShowStatistics">Статистика за месяц</v-btn>
            </v-col>
        </v-row>
    </v-container>
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
            date: undefined,
        }
    },
    methods: {
        isWeekShowStatistics(){
            this.date = this.getCurrentDaysOfWeek();
            this.$refs.chartsCalories.showStatistics(this.date, this.eatCalories, this.requiredCalories);
            this.$refs.chartsProteins.showStatistics(this.date, this.eatProteins, this.requiredProteins);
            this.$refs.chartsFats.showStatistics(this.date, this.eatFats, this.requiredFats);
            this.$refs.chartsCarbs.showStatistics(this.date, this.eatCarbs, this.requiredCarbs);
        },
        isMonthShowStatistics(){
            this.date = this.getCurrentDaysOfMonth();
            this.$refs.chartsCalories.showStatistics(this.date, this.eatCalories, this.requiredCalories);
            this.$refs.chartsProteins.showStatistics(this.date, this.eatProteins, this.requiredProteins);
            this.$refs.chartsFats.showStatistics(this.date, this.eatFats, this.requiredFats);
            this.$refs.chartsCarbs.showStatistics(this.date, this.eatCarbs, this.requiredCarbs);
        },
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
                this.requiredCalories[i] = useUserInfo().users[useUserInfo().activeUserId]?.needCalories;
                this.eatCalories[i] = useUserInfo().users[aciveUserId]?.eatCalories[`${weekDate[i]}${month}${year}`];

                this.requiredProteins[i] = useUserInfo().users[useUserInfo().activeUserId]?.needPFC.proteins;
                this.eatProteins[i] = useUserInfo().users[aciveUserId]?.eatPFC?.[`${weekDate[i]}${month}${year}`]?.proteins;

                this.requiredFats[i] = useUserInfo().users[useUserInfo().activeUserId]?.needPFC.fats;
                this.eatFats[i] = useUserInfo().users[aciveUserId]?.eatPFC?.[`${weekDate[i]}${month}${year}`]?.fats;

                this.requiredCarbs[i] = useUserInfo().users[useUserInfo().activeUserId]?.needPFC.carbs;
                this.eatCarbs[i] = useUserInfo().users[aciveUserId]?.eatPFC?.[`${weekDate[i]}${month}${year}`]?.carbs;
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
    // mounted(){
    //     this.date = this.getCurrentDaysOfWeek();
    // }
}
</script>

<style>

</style>