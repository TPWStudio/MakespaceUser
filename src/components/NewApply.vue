<template>
  <div id="NewApply">
    <div class="backImg animated flipInX" style="margin-top: 50px;">
      <el-card style="width: 80%;margin-right: auto;margin-left: auto;margin-top: 50px;">
        <div v-show="!haveApplication">
          <span style="font-size: 30px;font-weight: bold">当前暂未开放申请哦~敬请期待~</span>
        </div>
        <div v-show="haveApplication">
        <apply-entry></apply-entry>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import ApplyEntry from '../components/ApplyEntry'
    export default {
        name: "NewApply",
      components:{
        ApplyEntry
      },
      created(){
        let _this=this;
        this.$axios({
          method:'get',
          url:'/TeamManagement/isOpen'
        }).then(function (response) {
          if(response.data===true){
            _this.$data.haveApplication=true;
          }else{
            _this.$data.haveApplication=false;
          }
        })
      },
      data() {
        return{

          activeName1:'1',
          formBasic:{
            projectName:'',
            projectFundation:'',
            teamName:'',
            projectType:''
          },
          haveApplication:true,
          formMember:[{

          }]
        }
      }
    }
</script>

<style lang="less">
  #NewApply {
    .el-tabs__header{
      font-size: 25px;
      /*color: greenyellow;*/
    }

    .el-tabs__item{
      color: #000000;
      font-weight: bold;
      /*text-align: center;*/
    }

    .el-tabs__nav{
      /*background-color: white;*/
      /*color: greenyellow;*/
      /*width: 100%;*/
      /*font-weight: bold;*/
    }
  }

  .backImg{
    width: 100vw;
    height: 400px;
    float: left;
    background-image: url("../assets/2.jpg");
    background-size: 100%;
    background-position: 50px;
    z-index: 1;
  }
  .backImg:after{
    opacity: 0.6;
  }
</style>
