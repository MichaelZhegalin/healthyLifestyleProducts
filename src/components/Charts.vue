<template>
    <div class="test">
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
.test{
    height: 350px;
    width: 620px;
    background-color: whitesmoke;
    border-radius: 15px;
    padding: 15px;
}
</style>