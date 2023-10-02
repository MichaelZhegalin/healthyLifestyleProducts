<template>
    <div class="test">
        <canvas id="myChart"></canvas>
        <v-btn @click="showStatistics">Показать статистику</v-btn>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
    props:{
        chartsTitleOne: String,
        chartsTitleTwo: String,
        requiredCharacteristics: Array,
        obtainedCharacteristics: Array,
        date: Array
    },
    data(){
        return{
            ctx: undefined,
            canvas: undefined
        }
    },
    methods: {
        showStatistics(){
            this.ctx = document.getElementById('myChart')
            if(this.canvas !== undefined) {
                this.canvas.destroy();
            }
            this.canvas = new Chart(this.ctx, {
                type: 'bar',
                data: {
                labels: this.date,
                datasets: [
                    {
                        label: this.chartsTitleOne,
                        data: this.requiredCharacteristics,
                        borderWidth: 1
                    },
                    {
                        label: this.chartsTitleTwo,
                        data: this.obtainedCharacteristics,
                        borderWidth: 1
                    }
                ]
                },
            });
        }
    },
}
</script>

<style>
.test{
    height: 500px;
    width: 500px;
}
</style>