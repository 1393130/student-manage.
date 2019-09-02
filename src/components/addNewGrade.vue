<template> 
    <div class="addGrade">
        <h6>添加新成绩---{{student.stu_name}}同学</h6>
        <div class="block">
            <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="默认当前日期">
            </el-date-picker>
            <span class="demonstration">昨天</span>
        </div>
        <div><span>技能：</span><input type="number" min="0" max="100" placeholder="数字" v-model="skill"></div>
        <div><span>理论：</span><input type="number" min="0" max="100" placeholder="0-100之间的数字" v-model="theory"></div>
        <div><span>分析与解决方案：</span><textarea name="" id="" cols="40" rows="5" v-model="analysis"></textarea></div>
        <!-- <div><span>解决方案：</span><textarea name="" id="" cols="40" rows="5" v-model="resolve"></textarea></div> -->
        <div class="day">
            <span @click="changeDay('日考')" :class="{show: day==='日考'}">日考</span>
            <span @click="changeDay('周考')" :class="{show: day==='周考'}">周考</span>
        </div>
        <div class="handle">
            <b @click="handle">取消</b>
            <b class="addShow" @click="handle('cancle')">确定</b>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
import {mapState,mapMutations,mapActions} from "vuex"
export default Vue.extend({
    props:["status","seen","student"],
    components:{

    },
    data(){
        return {
            value1: '',
            skill:"",
            theory:"",
            day:"",
            analysis:"",
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                },
        }
    },
    computed:{

    },
    methods:{
        ...mapActions({
            sendAddGrade: "user/sendAddGrade"
        }),
        changeDay(type){
            this.day = type;
        },
        async handle(type){  
            if(type === 'cancle'){   //点击确定时
                if(!this.value1) return 
                if(!this.skill) return
                if(!this.theory) return
                if(!this.day) return 
                if(!this.analysis) return
                //转时间 yyyy-mmmm-dddd
                var times = new Date(this.value1);
                var month =(times.getMonth() + 1 )<10?'0'+(times.getMonth() + 1 ):(times.getMonth() + 1 )
                var myday =times.getDate()<10?'0'+times.getDate():times.getDate()
                var datetime=times.getFullYear() + '-' + month+ '-' + myday
                var record = this.day === "日考"?"0":"1"
                let res = await this.sendAddGrade({
                    record_date:datetime,
                    stuid:this.student.stuid,
                    skill_score:this.skill,
                    theory_score:this.theory,
                    analysis:this.analysis,
                    week_record	:record,
                })
                this.value1 =  '';
                this.skill = "";
                this.theory = "";
                this.day = "";
                this.analysis = "";
                this.$message({
                    message:res.msg,
                    type: 'success'
                });
               
                this.$emit("handle",false)
            }
            else{
                this.value1 =  '';
                this.skill = "";
                this.theory = "";
                this.day = "";
                this.analysis = "";
                this.$emit("handle",false)
            }
            
        }
    },
    created(){

    },
    mounted(){

    }
})
</script>
<style scoped lang="scss">
@import "../scss/show.scss"
</style>