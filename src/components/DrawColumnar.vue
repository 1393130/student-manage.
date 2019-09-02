<template>
    <div id="columnar" :style="{width:'100%',height:'400px'}"></div>
</template>
<script>
export default {
    props:{

    },
    components:{

    },
    data(){
        return {

        }
    },
    computed:{

    },
    methods:{
         drawColumnar(){
              // 基于准备好的dom，初始化echarts实例
            let columnar = this.$echarts.init(document.getElementById('columnar'))
            // 绘制图表
            columnar.setOption({
                title : {
                    text: 'XXX同学日周考成绩统计图',
                    subtext: '纯属虚构'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['技能','理论']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : ['08-01','08-02','08-03','08-04','08-05','08-06','08-07','08-08','08-09','08-10','08-11','08-12','08-13',]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'技能',
                        type:'bar',
                        data:[90, 87,89,90,80,94,98,93,89,87,87,89,94],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'理论',
                        type:'bar',
                        data:[60,20,40,30,80,70,60,20,40,30,80,70,90],
                        markPoint : {
                            data : [
                                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    }
                ]
            })
        }
    },
    created(){

    },
    mounted(){
        this.drawColumnar();
    }
}
</script>
<style scoped lang="scss">
    #columnar{
        padding: 25px;
    }
</style>