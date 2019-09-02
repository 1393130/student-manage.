<template>
    <div class="addAnalysis">
        <h6>添加分析---XXX同学</h6>
        <div class="block">
            <el-date-picker
            v-model="value2"
            type="datetime"
            placeholder="默认当前日期">
            </el-date-picker>
            <span class="demonstration">昨天</span>
        </div>
        <div><span>分析：</span><textarea name="" id="" cols="40" rows="5"></textarea></div>
        <div><span>解决方案：</span><textarea name="" id="" cols="40" rows="5"></textarea></div>
        <div class="handle">
            <b>取消</b>
            <b class="addShow">确定</b>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
export default Vue.extend({
    props:["status","seen","student"],
    components:{

    },
    data(){
        return {
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
            value1: '',
            value2: '',
        }
    },
    computed:{

    },
    methods:{

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