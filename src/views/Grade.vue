<template>
    <div class="grade">
        <HeaderTitle>{{stu_name}}学生日周考试成绩统计表</HeaderTitle>
        <div class="title">
            <div>
                <span>讲师：{{teacher_name}}</span>
                <span>学生：{{stu_name}}</span>
            </div>
            <select v-model="stu_name">
                <option 
                v-for="(item,index) in studentLists" 
                :key="index"
                >{{item.stu_name}}</option>
            </select>
            <span class="titleDelete">x</span>
        </div>
        <div class="content">
            <ul>
                <li>
                    <span>序号</span>
                    <span>日期</span>
                    <span>理论</span>
                    <span>技能</span>
                    <span class="solve">分析与解决</span>
                    <span>是否周考</span>
                    <div>
                        <span>操作</span>
                    </div>
                </li>
                <li v-for="(item,index) in  this.gradeList[this.stu_name]" :key="index">
                    <span>{{index+1}}</span>
                    <span>{{item.record_date}}</span>
                    <span>{{item.theory_score}}</span>
                    <span>{{item.skill_score}}</span>
                    <span class="solve">{{item.analysis}}</span>
                    <span>{{item.week_record == "0"?"日":"周"}}</span>
                    <div>
                        <span @click="dialogVisible = true">编辑</span>
                        <el-dialog
                            title="修改成绩"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleClose">
                            <!-- <div class="choose">
                                <span>理论：</span>
                                <input type="text" placeholder="0-100之间的数字">
                            </div> -->
                            <div class="choose">
                                <span>技能：</span>
                                <input type="text" placeholder="0-100之间的数字" v-model="newSkill">
                            </div>
                            <!-- <div class="day">
                                <span>日考</span>
                                <span>周考</span>
                            </div> -->
                            <div class="choose">
                                <span>解决方案：</span>
                                <textarea name="" id="" cols="30" rows="5" v-model="newAnalysis"></textarea>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="cancel(item)">确 定</el-button>
                            </span>
                        </el-dialog>
                        <span @click="open2">删除</span>
                    </div>
                </li>
                <li v-show="!this.gradeList[this.stu_name]">该生暂时未添加成绩</li>
            </ul>
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
            dialogVisible: false,
            cid: "",
            stu_name: "",
            teacher_name: "",
            gradeList:{},
            studentLists:[],
            newSkill:"",
            newAnalysis:"",
        }
    },
    computed:{
        // ...mapState({
        //     gradeList: state=>state.user.gradeList
        // })
    },
    methods:{
        ...mapActions({
            getStudentList : "user/getStudentList",
            getGradeList: "user/getGradeList",
            upDateInfo: "user/upDateInfo"
        }),
        open2() {  //点击删除，没有接口
            // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            // confirmButtonText: '确定',
            // cancelButtonText: '取消',
            // type: 'warning'
            // }).then(() => {
            //     this.$message({
            //         type: 'success',
            //         message: '删除成功!'
            //     });
            //     }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '已取消删除'
            //     });          
            // });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        async cancel(item){
            this.dialogVisible = false;
            if(!this.newSkill) return ;
            let res = await this.upDateInfo({
                record_date:item.record_date,	
                stuid:item.record_date,		
                skill_score:this.newSkill,
            })
            if(res.code === 1){
                this.$message({
                    message:res.msg,
                    type: 'success'
                });
                let gradeRes = await this.getGradeList({  //获取班级的成绩列表
                    cid: this.cid
                })
                if(gradeRes.code ===1){
                    this.gradeList = gradeRes.lists
                }
                this.newSkill = "";
            }
           
        }
    },
    created(){

    },
    async mounted(){
        this.cid = this.$route.query.cid;
        this.stu_name = this.$route.query.stu_name;
        this.teacher_name = this.$route.query.teacher_name;
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
    }
})
</script>
<style scoped lang="scss">
@import "../scss/grade.scss"
</style>