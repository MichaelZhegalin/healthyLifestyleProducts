<template>
    <div class="charts-container">
        <canvas :id="canvasId"/>
    </div>
</template>

<script>
    import Chart from 'chart.js/auto';

    export default {
        props:{
            chartsTitleOne: String,
            chartsTitleTwo: String,
            canvasId: String
        },
        data(){
            return{
                ctx: null,
                canvas: null
            }
        },
        methods: {
            showStatistics(date, requiredCharacteristics, obtainedCharacteristics){
                this.ctx = document.getElementById(this.canvasId)
                if (this.canvas !== null) {
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

<style lang="scss" scoped>
    .charts-container{
        height: 370px;
        width: 700px;
        background-color: whitesmoke;
        border-radius: 15px;
        padding: 15px;
    }
</style>