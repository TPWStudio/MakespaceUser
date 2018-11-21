<template>
  <div id="ApplyInformation">
    <!--申请之后的页面-->
    <div class="backImgApplyInformation">
      <el-card style="width: 600px;height: 400px;margin-left: auto;margin-right: auto;margin-top: 100px;">
        <span style="font-size: 26px;">请您确认加入演武创客空间:</span><br/>
        <div style="margin-top: 5px;">
          <div style="text-align: left;margin-left: 60px;margin-top: 30px;">
            <span>亲爱的{{teamName}}团队:</span>
          </div>
        </div>
        <div class="fonts-card">
          <p>点击确认加入后，将正式成为演武创客空间当中的一员，管理员将会为您分配座位号跟考勤号，您还将收到一封邮件，其中包含您的初始账号跟密码，请点击确认后及时查收</p>
          <p>如果您在结束时间内未确认加入，创客空间将收回您的申请并作废。</p>
        </div>
        <div style="margin-top: 50px;">
          <el-button type="primary" @click="linkTo">确认加入</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ConfirmTeam",
    data(){
      return{
        account:'31529',
        teamName:''
      }
    },
    created(){
      if(this.$route.query.account){
        this.$data.account=this.$route.query.account;
      }else{
      }
      let _this=this;

      this.$axios({
        method:'get',
        url:'tempTeam/getTeamName'
      }).then(function (response) {
        _this.$data.teamName=response.data;
      })


    },
    methods:{
      linkTo(){

        let _this=this;

        this.$axios({
          method:'get',
          url:'/tempTeam/confirmEnter'
        }).then(function (res){
          console.log(res.data);
          if(res.data){

            _this.$message({
              type:'success',
              message:'入驻成功！请注意查收邮件！'
            })
            _this.$router.push({path:'/'});
          }else{
            _this.$message.error('入驻失败！可能服务器君又出问题了')
          }
        }).catch(function (err) {
          console.log(err);
        })

      }
    }
  }
</script>

<style scoped>
  .fonts-card{
    margin-top: 20px;
    height: 160px;
    width: 400px;
    font-size: 16px;
    /*background-color: darkslateblue;*/
    margin-right: auto;
    margin-left: auto;
    /*margin-top: 40px;*/
    text-align: left;
  }


  .backImgApplyInformation{
    width: 100vw;
    height: 400px;
    float: left;
    background-image: url("../assets/2.jpg");
    background-size: 100%;
    background-position: 50px;
    z-index: 1;
    /*margin-top: 80px;*/
  }

</style>
