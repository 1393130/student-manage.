import {login,register,checkUser,userList} from "@/service"
import {setCookie} from "../../utils/index"
const state = {
   
}

const mutations = {
   
}

const actions = {
    async sendRegister(context:any,payload:any){  //注册
        let data = await register(payload)
        console.log("注册",data)
        return data
    },
    async sendLogin(context:any,payload:any){  //登录
        let data = await login(payload)
        console.log("登录",data)
        if(data.code === 1){
            setCookie(24*14)
        }
        return data
    },
    async checkUserLogin(context:any){  //检测用户信息
        let data = await checkUser()
        console.log("查询信息",data)
        return data
    },
    async getUserList(context:any){  //检测用户信息
        let data = await userList()
        console.log("获取用户列表",data)
        return data
    },
}
export default {
    namespaced:true,//命名空间--可以不写，默认true
    state,
    mutations,
    actions,
}