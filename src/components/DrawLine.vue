<template>
     <div class="line" :style="{width:'90%',height:'400px'}" ref="line"></div>
</template>
<script>
import { mapActions,mapMutations,mapState } from 'vuex';
export default {
    props:["student","cid","grade"],
    components:{

    },
    data(){
        return {
            dates:[],
            skill:[],
            theory:[],
        }
    },
    computed:{
         ...mapState({
            gradeList: state=>state.user.gradeList
        })
    },
    watch: {
        grade(val, newval) {
            // console.log("前面",val)
            // console.log("后头",newval)
            val && val.forEach((item,index)=>{
                this.dates.push(item.record_date)
                this.skill.push(item.skill_score)
                this.theory.push(item.theory_score)
            })
            this.drawLine()
        },
        student(name){
            this.dates = [];
            this.skill = [];
            this.theory = [];
        }
    },      
    methods:{
        drawLine(){
             // 基于准备好的dom，初始化echarts实例
            let line = this.$echarts.init(this.$refs.line)
            // 绘制图表
            line.setOption({
                 title : {
                    text: this.student.stu_name+'同学日周考成绩统计图',
                    subtext: '纯属虚构'
                },
                tooltip : { //气泡提示框
                    trigger: 'axis'
                },
                legend: {
                    data:['技能','理论']
                },
                toolbox: { //辅助工具
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
                        boundaryGap : false,
                        data :this.dates
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        boundaryGap : false,
                        data : ["0","20","40","60","80","100"]
                    }
                ],
                series : [
                    {
                        name:'技能',
                        type:'line',
                        data:this.skill,
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
                        type:'line',
                        data:this.theory,
                        markPoint : {
                            data : [
                                {name : '周最低', value : 0, xAxis: 1, yAxis: 1}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    }
                ]
            });
        },
    },
    created(){

    },
    mounted(){
         this.drawLine()
        // console.log("grade",this.gradeList)
        // let res= await this.getGradeList({
        //     cid: this.cid
        // })
        // if(res.code ===1){
        //     this.gradeList = res.lists;
        //     // console.log("!111", res.lists[this.student.stu_name])
        //     res.lists[this.student.stu_name]&& res.lists[this.student.stu_name].forEach((item,index)=>{
        //         this.dates.push(item.record_date)
        //         this.skill.push(item.skill_score)
        //         this.theory.push(item.theory_score)
        //     })
        //     // console.log('this.dates',this.dates)
        //     // console.log('this.skill',this.skill)
        //     // console.log('this.theory',this.theory)
        //     this.drawLine(); 
        // }
    }
}
</script>
<style scoped lang="scss">
.line{
    padding: 20px;
}
</style>