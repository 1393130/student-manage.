<template>
    <div class="login">
        <HeaderTitle title="重点学生日周考成绩录入登录系统"></HeaderTitle>
        <div class="center">
            <h2>网站工程</h2>
            <div class="nav">
                <span @click="change('登录')" :class="{show:submitVal === '登录'}">登录</span>
                <span @click="change('注册')" :class="{show:submitVal === '注册'}">注册</span>
            </div>
            <div>
                <input type="text" placeholder="用户名" v-model="username">
            </div>
            <div>
                <input type="text" placeholder="请输入密码" v-model="pwd">
            </div>
            <div v-if="submitVal==='注册'">
                <input type="text" placeholder="请输入手机号(可选择)" v-model="tel">
            </div>
            <div class="checkbox"  v-if="submitVal==='登录'">
                <input type="checkbox" v-model="checked" @click="choose">
                <span>两周内免登录</span>
            </div>
            <div>
               <button @click="submit">{{submitVal}}</button>
            </div>
        </div>    
    </div>
</template>
<script>
import Vue from "vue"
import {mapState,mapMutations,mapActions} from "vuex"
import {getCookie} from "../utils/index"
export default Vue.extend({
    data(){
        return {
            tel:"",
            pwd:"",
            username:"",
            submitVal:"登录",  //提交上的文字  是登录还是注册？
            validlength:"",  //过期时间
            checked: false,
        }
    },
    computed:{
       
    },
    methods:{
        ...mapActions({
            sendRegister : "login/sendRegister",
            sendLogin : "login/sendLogin",
            checkUserLogin : "login/checkUserLogin",
            getUserList: "login/getUserList"
        }),
        change(val){  //切换注册与登录
            this.submitVal = val
        },
        async submit(){
            //注册
            if(!this.username) return;
            if(!this.pwd) return ;
            if(this.submitVal === "注册"){
                let res = await this.sendRegister({
                    username:this.username,
                    password:this.pwd,
                    phone:this.tel
                })
                if(res.code === 1){
                    this.submitVal = "登录"
                }else{
                    alert("用户名重复")
                }
            }else if(this.submitVal === "登录"){
                let loginRes = await this.sendLogin({
                    username: this.username,
                    password: this.pwd,
                    validlength: this.checked?(24*14).toString() : ""
                })
                if(loginRes.code === 1){
                    let checkRes = await this.checkUserLogin()   
                    let listRes = await this.getUserList()
                    if(checkRes.code === 1){
                        // localStorage.setItem("userInfo",JSON.stringify(checkRes.useinfo))
                        this.$router.push({path:'/show'});
                    }
                    
                }else{
                    alert("用户名输入错误")
                }
            }
            
        },
        choose(){
            this.checked = !this.checked
        }
    },
    created(){
        if(getCookie()){
            this.$router.push({path:'/show'});
        }
    },
    mounted(){  
        
    }
})
</script>
<style scoped lang="scss">
@import "../scss/login.scss"
</style>