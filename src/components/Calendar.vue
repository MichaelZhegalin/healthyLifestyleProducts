<template>
    <v-container class="d-flex flex-column align-center">
        <nav class="d-flex justify-center">
            <v-container 
                class="d-flex align-center calendar-nav" 
                style="background-color: white; 
                width: 50vw;"
            >
                <v-row>
                    <v-col class="text-center">
                        <v-btn style="text-align: center;" @click="ToPrevMonth">
                            Назад
                        </v-btn>
                    </v-col>
                    <v-col class="d-flex align-center justify-center">
                        Выбран: {{ selectedDate.month }} {{ selectedDate.year }}
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="ToNextMonth">Вперед</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </nav>
        <v-table class="calendar-table">
            <thead>
                <tr>
                    <th class="text-center" v-for="item in dayName" :key="item">
                        {{item}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="weekNum in monthWeeks.length" :key="weekNum">
                    <td
                        :class="[days?`calendar-td`:'', `text-center`]"
                        v-for="days in weekDays(weekNum - 1)"
                        :key="days"
                        @click="selectedDay(days)"
                    >
                        {{ days }}
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-container>
</template>

<script>
    import { useFoodInfo } from '@/store/foodInfoModule';
    import { useUserInfo } from '@/store/userInfoModule';

    export default {
        data(){
            return{
                dayName: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
                monthName: ["Январь", "Февраль", "Март", "Апрель",
                            "Май", "Июнь", "Июль", "Август", "Сентябрь",
                            "Октябрь", "Ноябрь", "Декабрь"],
                monthWeeks: [],
                selectedDate: {
                    month: '',
                    year: ''
                },
                selectMonth: null,
                selectYear: null
            }
        },
        methods:{
            ToNextMonth(){
                if (this.selectMonth !== 11) {
                    this.selectMonth += 1;
                } else {
                    this.selectMonth = 0;
                    this.selectYear += 1;
                }
            },
            ToPrevMonth(){
                if (this.selectMonth !== 0) {
                    this.selectMonth -= 1;
                } else {
                    this.selectMonth = 11;
                    this.selectYear -= 1;
                }
            },
            createCalendar(year, month){
                let date = new Date(year, month);
                let saveWeekDaysLen = 0;
                let weekDaysCounter = 0;
                let weekDays = [];
                this.monthWeeks = [];

                this.selectedDate.month = this.monthName[month];
                this.selectedDate.year = year;

                for(let i = 0; i < this.getDay(date); i++){
                    weekDays[i] = null;
                }

                saveWeekDaysLen = weekDays.length;

                while(date.getMonth() === month){
                    weekDays[saveWeekDaysLen + weekDaysCounter] = date.getDate();
                    if (this.getDay(date) % 7 === 6) {
                        this.monthWeeks[this.monthWeeks.length] = weekDays;
                        weekDays = [];
                        saveWeekDaysLen = 0;
                        weekDaysCounter = -1;
                    }
                    date.setDate(date.getDate() + 1);
                    weekDaysCounter += 1;
                }

                if (this.getDay(date) !== 0) {
                    for(let i = this.getDay(date); i < 7; i++){
                        weekDays[i] = null;
                    }
                }

                this.monthWeeks[this.monthWeeks.length] = weekDays;
            },
            weekDays(weekNum){
                return this.monthWeeks[weekNum];
            },
            getDay(date){
                let day = date.getDay();
                if (day === 0) {
                    day = 7;
                }
                return day - 1;
            },
            selectedDay(dayNum){
                if (useUserInfo().activeUserId) {
                    useFoodInfo().setEatFoodInfoForNewDay(`${dayNum}${this.selectMonth}${this.selectYear}`);
                    this.$router.push('day');
                } else {
                    alert(
                            `Дорогой пользователь!
Перед тем как заносить информацию о съеденных блюдах, пожалуйста, войдите/создайте свой профиль во вкладке "Пользователи"`
                        );
                } 
            }
        },
        watch:{
            selectMonth(newSelectedMonth){
                this.createCalendar(this.selectYear, newSelectedMonth);
            }
        },
        mounted(){
            this.selectMonth = new Date().getMonth();
            this.selectYear = new Date().getFullYear();
        }
    }
</script>

<style lang="scss" scoped>
    .calendar-table{
        width: 60vw;
        border-radius: 10px;
    }
    .calendar-nav{
        border-bottom: 1px solid rgb(190, 190, 190);
        border-radius: 10px 10px 0 0;
    }
    .calendar-td:hover{
        transition: ease-in 100ms;
        background-color: forestgreen;
        cursor: pointer;
    }
</style>