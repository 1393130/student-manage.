<template>
   <div class="class">
        <span>切换班级：</span>
        <ul>
            <li 
                v-for="(item,index) in className" 
                :key="index" 
                :class="{show:index === ind}"
                @click="changeClass(index,item)"
            >{{item.class_name}}</li>
            <p @click="createClass">创建班级+</p>
        </ul>
        <el-dialog
            title="添加班级"
            :visible.sync="dialogVisible"
            width="30%">
            <div class="addClassIpt"><input type="text" placeholder="班级名" v-model="classname"></div>
            <div class="addClassIpt"><input type="text" placeholder="教室号" v-model="classroom"></div>
            <div class="addClassIpt"><input type="text" placeholder="辅导员" v-model="assistant"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Vue from "vue"
import {mapState,mapMutations,mapActions} from "vuex"
export default Vue.extend( {
    props:{

    },
    components:{

    },
    data(){
        return {
            dialogVisible: false,
            // className:[],
            classname:"",
            classroom:"",
            assistant:"",
            ind:0,
        }
    },
    computed:{
        ...mapState({
            className : state => state.user.className
        })
    },
    methods:{
        ...mapActions({
            getClassList : "user/getClassList",
            sendCreateClass : "user/sendCreateClass"
        }),
        changeClass(index,item){   //切换班级
            this.ind = index
            this.$emit('studentInfo',item)
        },
        createClass(){  //出现添加班级的弹框
            this.dialogVisible = true;
            this.classname = "";
            this.classroom = "";
            this.assistant = "";
        },
        async confirm(){
            this.dialogVisible = false;
                if(!this.classname) return ;
                if(!this.classroom) return ;
                if(!this.assistant) return ;
                let res = await this.sendCreateClass({
                    type:"create",
                    classname:this.classname,
                    classroom:this.classroom,
                    assistant:this.assistant
                })
                if(res.code === 1){
                    this.getClassList()
                }
        }
    },
    created(){

    },
    async mounted(){
       let res = await this.getClassList()
       if(res.code === 1){
           this.$emit('studentInfo',this.className[0])
       }
       
    }
})
</script>
<style scoped lang="scss">
@import "../scss/addClass.scss"
</style>