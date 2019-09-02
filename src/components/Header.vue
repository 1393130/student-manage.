<template>
    <div class="header">
        <span>重点学生关注</span>
        <div>
            <span>-</span>
            <span>10%</span>
            <span>+</span>
        </div>
        <div>
            <span class="iconfont icon-yanjing" @click="change('yanjing')" :class="{show:val === 'yanjing'}"></span>
            <span class="iconfont icon-charudaima" @click="change('charudaima')" :class="{show:val === 'charudaima'}"></span>
            <span class="iconfont icon-xinxi" @click="change('xinxi')" :class="{show:val === 'xinxi'}"></span>
        </div>
        <div>
            <span class="iconfont icon-config--shixin"></span>
            <span class="iconfont icon-fenxiang"></span>
            <span class="iconfont icon-1"></span>
        </div>
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
            val:"yanjing"
        }
    },
    computed:{

    },
    methods:{
        change(value){
            this.val = value;
        }
    },
    created(){

    },
    mounted(){

    }
})
</script>
<style scoped lang="scss">
@import "../scss/header.scss"
</style>