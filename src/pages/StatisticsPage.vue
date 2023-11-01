<template>
    <v-container>
        <form-dialog
            v-model="isShowDialog" 
            :btnVisible="false"
            @closeDialogForm="closeDialogForm"
        >
            <template #formBody>
                <add-date-statistics-form
                    :dateProp="calendarDate"
                    @addDate="addDate"
                />
            </template>
        </form-dialog>
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
                <v-btn @click="isWeekShowStatistics">
                    Статистика за неделю
                </v-btn>
            </v-col>
            <v-col class="d-flex justify-center">
                <v-btn @click="showDialog">
                    Статистика за произвольный промежуток
                </v-btn>
            </v-col>
            <v-col class="d-flex justify-center">
                <v-btn @click="isMonthShowStatistics">
                    Статистика за месяц
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Charts from '@/components/Charts.vue'
    import { useUserInfo } from '@/store/userInfoModule'
    import AddDateStatisticsForm from '@/components/form/AddDateStatisticsForm.vue'
    import FormDialog from '@/components/dialog/FormDialog.vue'
    
    export default {
        components: {Charts, AddDateStatisticsForm, FormDialog},
        data(){
            return{
                calendarDate: [],
                isShowDialog: false,
                eatCalories: [],
                requiredCalories: [],
                eatProteins: [],
                requiredProteins: [],
                eatFats: [],
                requiredFats: [],
                eatCarbs: [],
                requiredCarbs: [],
                date: null,
            }
        },
        methods: {
            addDate(value){
                this.calendarDate = value;
            },
            getCurrentDaysOfInterval(calendarDate){
                const year = calendarDate[0]?.getFullYear();
                let month = calendarDate[0]?.getMonth();
                let aciveUserId = useUserInfo().activeUserId;
                let dates = [];
                if (calendarDate.length < 2 && calendarDate.length !== 0) {
                    alert("Необходимо выбрать промежуток!");
                } else if (calendarDate.length === 2) {
                    let interval = calendarDate[1].getDate() - calendarDate[0].getDate();
                    for(let i = 0; i <= interval; i++){
                        dates[i] = calendarDate[0].getDate();
                        this.setInfoForCharts(dates[i], month, year, i, aciveUserId);
                        calendarDate[0].setDate(calendarDate[0].getDate() + 1);
                        if (calendarDate[0].getDate() < calendarDate[0][i]) {
                            month += 1;
                        }
                    }
                }

                return dates
            },
            closeDialogForm(){
                if (this.calendarDate !== undefined) {
                    this.date = this.getCurrentDaysOfInterval(this.calendarDate);
                    this.activeRefFoo();
                }
            },
            showDialog(){
                this.isShowDialog = true;
            },
            activeRefFoo(){
                this.$refs.chartsCalories.showStatistics(this.date, this.eatCalories, this.requiredCalories);
                this.$refs.chartsProteins.showStatistics(this.date, this.eatProteins, this.requiredProteins);
                this.$refs.chartsFats.showStatistics(this.date, this.eatFats, this.requiredFats);
                this.$refs.chartsCarbs.showStatistics(this.date, this.eatCarbs, this.requiredCarbs);
            },
            isWeekShowStatistics(){
                this.date = this.getCurrentDaysOfWeek();
                this.activeRefFoo();
            },
            isMonthShowStatistics(){
                this.date = this.getCurrentDaysOfMonth();
                this.activeRefFoo();
            },
            getCurrentDaysOfWeek(){
                const year = new Date().getFullYear();
                let month = new Date().getMonth();
                let date = new Date();
                let weekDate = [];
                let aciveUserId = useUserInfo().activeUserId;
                let saveDateForCheck = date.getDate();
                date.setDate(date.getDate() - 3);
                if (date.getDate() > saveDateForCheck) {
                    month -= 1;
                }

                for(let i = 0; i < 7; i++){
                    weekDate[i] = date.getDate();
                    this.setInfoForCharts(weekDate[i], month, year, i, aciveUserId);
                    date.setDate(date.getDate() + 1);
                    if (date.getDate() < weekDate[i]) {
                        month += 1;
                    }
                }
                return weekDate
            },
            setInfoForCharts(day, month, year, num, aciveUserId){
                this.requiredCalories[num] = useUserInfo().users[useUserInfo().activeUserId]?.needCalories;
                this.eatCalories[num] = useUserInfo().users[aciveUserId]?.eatCalories[`${day}${month}${year}`];

                this.requiredProteins[num] = useUserInfo().users[useUserInfo().activeUserId]?.needPFC.proteins;
                this.eatProteins[num] = useUserInfo().users[aciveUserId]?.eatPFC?.[`${day}${month}${year}`]?.proteins;

                this.requiredFats[num] = useUserInfo().users[useUserInfo().activeUserId]?.needPFC.fats;
                this.eatFats[num] = useUserInfo().users[aciveUserId]?.eatPFC?.[`${day}${month}${year}`]?.fats;

                this.requiredCarbs[num] = useUserInfo().users[useUserInfo().activeUserId]?.needPFC.carbs;
                this.eatCarbs[num] = useUserInfo().users[aciveUserId]?.eatPFC?.[`${day}${month}${year}`]?.carbs;
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
                    this.setInfoForCharts(monthDate[dayCounter], month, year, dayCounter, aciveUserId)
                    date.setDate(date.getDate() + 1);
                    dayCounter += 1;
                }

                return monthDate
            }
        },
        mounted(){
            this.isWeekShowStatistics()
        }
    }
</script>