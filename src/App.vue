<template>
  <div id="app">
    <!-- <Header></Header> -->
    <router-view/>
    <Sidebar></Sidebar>
  </div>
</template>
<script>
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

export default {
    data(){
        return {
           
        }
    },
    components:{
       Header,
       Sidebar
    },
    computed:{
     
    },
    methods:{
     
    },
    created(){

    },
    mounted(){
     
    }
}
</script>
<style lang="scss">
@import "./scss/index.scss"
</style>
