<template>
    <div class="echart">
        <div :id="echartId" class="echart-con">
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    name: 'chart',
    data () {
        return  {
            chart: null,
            echartId: `echart${Math.floor(Math.random()*10000000)}`
        }
    },
    mounted () {
        // 初始化
        this.initEchart()
    },
    methods: {
        initEchart () {
            this.chart = echarts.init(document.getElementById(this.echartId))
            this.chart.setOption({
                title: {
                text: '行程频率分布图'
                // x: 'center'
                },
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                    color: '#999'
                    }
                }
                },
                toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
                },
                legend: {
                data: ['出行', '交通', '速度'],
                top: '15%'
                },
                grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '28%',
                containLabel: true
                },
                xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
                    axisPointer: {
                    type: 'shadow'
                    }
                }
                ],
                yAxis: [
                {
                    type: 'value',
                    name: '频率',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                    formatter: '{value}次'
                    }
                },
                {
                    type: 'value',
                    name: '速度',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                    formatter: '{value}km/s'
                    }
                }
                ],
                series: [
                {
                    name: '出行',
                    type: 'bar',
                    data: [2, 25, 76, 135, 82, 54, 47, 23]
                },
                {
                    name: '交通',
                    type: 'bar',
                    data: [2, 28, 70, 175, 102, 95, 59, 26]
                },
                {
                    name: '速度',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 6.3, 10.2, 20.3, 23.4, 17.2, 10.3, 6.5]
                }
                ]
            })
        }
    }
}
</script>
<style lang="less">
.echart{
    height: 100%;
    .echart-con{
        margin: 200px 0;
        height: 400px;
    }
}
  svg{
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 200px;
  }

</style>


