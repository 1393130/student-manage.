<template>
    <div class="chart">
      <HeaderTitle title="重点关注学生考试成绩统计图"></HeaderTitle>
      <div class="choose">
        <div class="choose-left">选择班级：</div>
            <ul class="choose-right">
                <li class="chooseActive">1703D</li>
                <li>1704A</li>
                <li>1704A</li>
                <li>1704A</li>
                <li>1704A</li>
                <li>1704A</li>
                <li>1704A</li>
                <li>1704A</li>
                <li>1704A</li>
                <li>1704A</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:{

    },
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
}
</script>
<style scoped lang="scss">
  .chart {
        width: 100%;
        height: 100%;
  .head {
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: #0076ff;
    color: white;
    font-size: 18px;
    text-align: center;
  }
}
.choose {
  left: 0px;
  top: 121px;
  width: 100%;
  height: 150px;
  line-height: 20px;
  border: 1px solid rgba(187, 187, 187, 1);
  display: flex;
  .choose-left {
    width: 10%;
    height: 85%;
    text-align: center;
    padding-top: 22px;
    font-size: 13px;
  }
  .choose-right {
    width: 80%;
    margin-left: 40px;
    height: 90%;
    display: flex;
    padding-top: 15px;
    flex-wrap: wrap;
    li {
      width: 95px;
      height: 30px;
      line-height: 20px;
      border-radius: 4px 4px 4px 4px;
      background-color: rgba(230, 241, 252, 1);
      text-align: center;
      border: 1px solid rgba(163, 208, 253, 1);
      line-height: 30px;
      text-align: center;
      color: #1989fa;
      font-size: 13px;
      margin-right: 50px;
    }
    .chooseActive {
      left: 157px;
      top: 149px;
      width: 92px;
      height: 30px;
      line-height: 20px;
      border-radius: 4px;
      background-color: rgba(24, 144, 255, 1);
      text-align: center;
      color: white;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>