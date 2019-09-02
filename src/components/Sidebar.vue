<template>
    <div class="sidebar" :class="{hidden:show}">
      <span class="fixed" @click="changeShow">《</span>
      <input type="text" class="search" placeholder="搜索页面">
      <ul>
        <li>
          <span> - 主页</span>
          <div><router-link to="/login" tag="span"> ◐ 登录与注册</router-link></div>
        </li>
        <li>
          <router-link to="/show" tag="span"> - 可视化展示</router-link>
          <div><router-link to="/grade" tag="span"> ◐ 所有成绩</router-link></div>
        </li>
        <li>
          <router-link to="/rector" tag="span"> - 院长视角</router-link>
          <div><router-link to="/charts" tag="span"> ◐ charts</router-link></div>
        </li>
      </ul>
    </div>
</template>
<script>
import Vue from "vue"
export default Vue.extend({
    props:{

    },
    components:{

    },
    data(){
        return {
            show:false
        }
    },
    computed:{

    },
    methods:{
        changeShow(){
            this.show = !this.show
        }
    },
    created(){

    },
    mounted(){

    }
})
</script>
<style scoped lang="scss">
@import "../scss/sidebar.scss"
</style>