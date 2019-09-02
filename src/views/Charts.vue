<template>
    <div class="chart">
        <HeaderTitle title="重点关注学生考试成绩统计图"></HeaderTitle>
        <div class="choose">
            <div class="menu">
                <div class="menu-left">选择班级：</div>
                <ul class="choose-right">
                    <li
                        v-for="(item,index) in className"
                        :key="index"
                        :class="{chooseActive: index === ind}"
                        @click="changeClass(index,item)"
                    >
                        {{item.class_name}}
                    </li>
                </ul>
            </div>
            <div class="menu">
                <div class="menu-left">名  单：</div>
                <ul class="choose-right">
                    <li
                        v-for="(item,index) in studentLists"
                        :key="index"
                        class="noColor"
                        @click="chooseStudent(item)"
                    >
                        {{item.stu_name}}
                    </li>
                    <li class="noColor">({{studentLists.length}}/人)</li>
                </ul>
            </div>
        </div>
        <DrawLine  :student="student"  :grade="gradeList[student.stu_name]"/>
        <div class="method">
            <div class="method-left">
                <p>2019-08-30</p>
                <p>今日分析及解决方案：</p>
                <p>点击查看历史记录 ></p>
            </div>
        <div class="method-right">撒的风大贵好</div>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
import {mapState,mapMutations,mapActions} from "vuex"
export default Vue.extend({
    props:{

    },
    components:{

    },
    data(){
        return {
            ind: 0,
            student:{},
            gradeList:{},
            studentLists:[],
            cid:'',
        }
    },
    computed:{
        ...mapState({
            className : state => state.user.className,
            // studentLists : state => state.user.studentLists,
        })
    },
    methods:{
        ...mapActions({
            getClassList : "user/getClassList",
            getStudentList : "user/getStudentList",
            getGradeList : "user/getGradeList",
            getGradeList: "user/getGradeList",
        }),
       async changeClass(index,item){   //切换班级
            this.ind = index
            this.student = this.className[index]
            this.cid = item.cid;
            let listRes = await this.getStudentList({  //获取某一个班级的重点学生
                cid: item.cid
            })
            if(listRes.code === 1){
                this.studentLists = listRes.lists
            }
            let gradeRes = await this.getGradeList({  //获取班级的成绩列表
                cid: this.cid
            })
            if(gradeRes.code ===1){
                this.gradeList = gradeRes.lists
            }
        },
        chooseStudent(item){
            this.student = item
        }
    },
    created(){

    },
    async mounted(){
        let res = await this.getClassList()
        if(res.code === 1){
            this.cid = this.className[0].cid
            let listRes = await this.getStudentList({  //获取某一个班级的重点学生
                cid: this.cid
            })
            if(listRes.code === 1){
                this.studentLists = listRes.lists
                this.student = listRes.lists[0]
            }
           
            let gradeRes = await this.getGradeList({  //获取班级的成绩列表
                cid: this.cid
            })
            if(gradeRes.code ===1){
                this.gradeList = gradeRes.lists
            }
        }
    }
})
</script>
<style scoped lang="scss">
@import "../scss/charts.scss"
</style>