<template>
    <div class="headerTitle">
        {{title}}
        <slot></slot>
    </div>
</template>
<script>
import Vue from "vue"
export default Vue.extend({
    props:["title"],
    components:{

    },
    data(){
        return {

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

</style>