<template>
    <div class="test">
        <canvas :id="canvasId"></canvas>
        <v-btn @click="showStatistics">Показать статистику</v-btn>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
    props:{
        canvasId: 0,
        chartsTitleOne: String,
        chartsTitleTwo: String,
        requiredCharacteristics: Array,
        obtainedCharacteristics: Array,
        date: Array,
        canvasId: String
    },
    data(){
        return{
            ctx: undefined,
            canvas: undefined
        }
    },
    methods: {
        showStatistics(){
            this.ctx = document.getElementById(this.canvasId)
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
    // mounted(){
    //     this.canvasId = 'myChart';
    // }
}
</script>

<style>
.test{
    height: 500px;
    width: 500px;
}
</style>