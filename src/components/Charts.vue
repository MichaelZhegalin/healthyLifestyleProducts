<template>
    <div class="charts-container">
        <canvas :id="canvasId"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
    props:{
        canvasId: 0,
        chartsTitleOne: String,
        chartsTitleTwo: String,
        canvasId: String
    },
    data(){
        return{
            ctx: undefined,
            canvas: undefined
        }
    },
    methods: {
        showStatistics(date, requiredCharacteristics, obtainedCharacteristics){
            this.ctx = document.getElementById(this.canvasId)
            if(this.canvas !== undefined) {
                this.canvas.destroy();
            }
            this.canvas = new Chart(this.ctx, {
                type: 'bar',
                data: {
                    labels: date,
                    datasets: [
                        {
                            label: this.chartsTitleOne,
                            data: requiredCharacteristics,
                        },
                        {
                            label: this.chartsTitleTwo,
                            data: obtainedCharacteristics,
                        }
                    ]
                },
            });
        }
    },
}
</script>

<style>
.charts-container{
    height: 370px;
    width: 700px;
    background-color: whitesmoke;
    border-radius: 15px;
    padding: 15px;
}
</style>