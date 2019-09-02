<template>
    <div class="show">
        <HeaderTitle title="重点关注学生考试成绩统计图"></HeaderTitle>
        <AddClass @studentInfo='studentInfo'></AddClass>
        <div class="content">
            <div>
                <div class="addStudent">
                    <span>添加学生</span>
                    <input type="text" placeholder="输入学生的姓名" v-model="name">
                    <input type="number" placeholder="末位次数" v-model="num">
                    <input type="text" placeholder="结对子" v-model="description">
                    <span class="appendStudent" @click="appendStudent">添加</span>
                </div>
                <div 
                    v-for="(item,index) in studentLists"
                    :key="index"
                >
                    <DrawLine :student="item" :cid="cid" :grade="gradeList[item.stu_name]"></DrawLine>
                    <div class="resolve">
                        <div>
                            <span @click="addgrade(item)">添加成绩+</span>
                            <!-- <span @click="addAnaly(item)">添加解析方案+</span> -->
                        </div>
                        <span @click="allGrades(item)">查看和编辑该生所有的成绩</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="add" v-show="seen">
            <AddGrade 
                v-show="addStudentGrade" 
                :status="addStudentGrade" 
                :seen="seen" 
                :student="student"
                @handle="handle"
            ></AddGrade>
            <AddAnalyze 
                v-show="addStudentAnaly" 
                :status="addStudentAnaly" 
                :seen="seen" 
                :student="student"
            ></AddAnalyze>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from "vuex"
import Vue from "vue"
import AddClass from "../components/addClass"
import AddGrade from "../components/addNewGrade"
import AddAnalyze from "../components/addAnalyze"
import BScroll from "better-scroll"
export default Vue.extend({
    props:{

    },
    components:{
        AddClass,
        AddGrade,
        AddAnalyze
    },
    data(){
        return {
            name: "",
            num: "",
            description: "",
            instructor:"",
            cid:"",//班级id
            studentLists:[],
            addStudentGrade:false,
            addStudentAnaly:false,
            seen:false,
            student:{},  //添加某一学生的成绩和分析，
            gradeList:{},
            teacher_name:"",
        }
    },
    computed:{
        ...mapState({
            // gradeList: state=>state.user.gradeList,
            // studentLists: state=>state.user.studentLists,
        })
    },
    methods:{
        ...mapActions({
            getClassList : "user/getClassList",
            sendCreateClass : "user/sendCreateClass",
            sendCreateStudent : "user/sendCreateStudent",
            getStudentList : "user/getStudentList",
            getGradeList: "user/getGradeList",
        }),
        async studentInfo(info){  //子向父传递的参数
            this.cid = info.cid;
            this.instructor = info.teacher_name
            this.teacher_name = info.teacher_name
            let res = await this.getStudentList({  //获取某一个班级的重点学生
                cid: this.cid
            })
            if(res.code === 1){
                this.studentLists = res.lists
            }
            
            let gradeRes = await this.getGradeList({  //获取班级的成绩列表
                cid: this.cid
            })
            if(gradeRes.code ===1){
                this.gradeList = gradeRes.lists
            }
        },
        async appendStudent(){   //添加重点学生
            if(!this.cid) return 
            if(!this.name) return 
            if(!this.num) return
            let res = await this.sendCreateStudent({
                cid:this.cid,
                stu_name:this.name,
                repetitions:this.num,
                description:this.description,	
                instructor:this.instructor
            })
            if(res.code === 1){
                this.$message({
                    message: '添加学生成功',
                    type: 'success'
                });
                let data = await this.getStudentList({  //添加学生之后重新获取某一个班级的重点学生
                    cid: this.cid
                })
                if(data.code === 1){
                    // console.log("添加之后获取的学生列表",data.lists)
                    this.studentLists = data.lists
                    this.name = "";
                    this.num = "";
                    this.description	= "";
                }
                let gradeRes = await this.getGradeList({  //添加学生之后重新获取成绩列表
                    cid: this.cid
                })
                if(gradeRes.code ===1){
                    this.gradeList = gradeRes.lists
                }
            }else{
                this.$message({
                    message: '添加学生失败，请重新填写信息',
                    type: 'error'
                });
            }
        },
        addgrade(item){   //点击添加成绩
            this.addStudentGrade = true;
            this.seen = true;
            this.student = item;
        },
        addAnaly(item){ //点击添加成绩分析
            this.addStudentAnaly =true;
            this.seen = true;
            this.student = item
        },
        async handle(flag){
            this.seen = flag;
            this.addStudentGrade = flag;
            this.addStudentAnaly = flag;
            let gradeRes = await this.getGradeList({  //添加成绩后要重新获取班级的成绩列表
                cid: this.cid
            })
            if(gradeRes.code ===1){
                this.gradeList = gradeRes.lists
            }
        },
        allGrades(item){ //查看该生所有的成绩
            this.$router.push({path:"/grade",query:{cid:this.cid,stu_name:item.stu_name,teacher_name:this.teacher_name}})
        }
      
    },
    created(){

    },
    mounted(){
        this.$nextTick(()=>{
            new BScroll(".content")
        })
    }
})
</script>
<style scoped lang="scss">
@import "../scss/show.scss"
</style>