<template>
  <div id="app">
   <!-- <div v-if="$route.path=='/'||$route.path=='/newsCenter'||$route.path=='/ApplyEntry'||$route.path=='/Login'">-->
      <div class="a">
        <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"  style="position: fixed;top: 0;width: 100%;z-index: 100;min-width: 1000px;">
          <el-menu-item @click="back">
            <svg style="height: 60px;width: 400px;">
              <!-- Symbol-->
              <symbol id="s-text">
                <text style="font-size:40px;" text-anchor="middle" x="50%" y="50%" dy=".35em">厦门大学演武创客空间</text>
              </symbol>
              <!-- Duplicate symbols-->
              <use class="text" xlink:href="#s-text"></use>
              <use class="text" xlink:href="#s-text"></use>
              <use class="text" xlink:href="#s-text"></use>
              <use class="text" xlink:href="#s-text"></use>
              <use class="text" xlink:href="#s-text"></use>
            </svg>
          </el-menu-item>
          <el-menu-item style="float: right;" index="2">
            <div v-if="!isLogin"  @click="linkto5">
            <i class="el-icon-bell"></i>团队登录
            </div>
            <div v-if="isLogin" @click="linkto4">
              <i class="el-icon-bell"></i>团队中心
            </div>
          </el-menu-item>
          <el-menu-item style="float: right" index="3">
            <i class="el-icon-news"></i>新闻中心
          </el-menu-item>
          <el-menu-item style="float: right" index="4">
            <div @click="ApplyNow">
            <i class="el-icon-edit-outline"></i>申请入驻
            </div>
          </el-menu-item>
          <el-menu-item style="float: right" index="5">
            <div @click="dialogVisible=true">
            <i class="el-icon-search"></i>申请查询
            </div>
          </el-menu-item>
        </el-menu>
    </div>
    <el-dialog
      title="查询申请"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="ruleForm" :rules="rules" label-width="70px">
        <el-form-item label="验证码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入验证码"></el-input>
        </el-form-item>
      </el-form>
    <el-button type="primary" @click="ApplyQuery">确 定</el-button>
    <el-button @click="dialogVisible=false">取 消</el-button>
    </el-dialog>

    <router-view/>



  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.$alert('本网站建议使用Chrome、Firefox等浏览器，请尽量避免使用IE浏览器和360浏览器', '浏览器兼容', {
      confirmButtonText: '确定',
      callback: action => {

      }
    });
  },
  data() {
    return {
      isLogin:false,
      show: true,
      activeIndex: '1',
      dialogVisible: false,
      ruleForm:{
        password:''
      },
      rules:{
        password:[
          {required:true,message:'请输入验证码',trigger:'blur'}
        ]
      }
    };
  },
  methods: {
    ApplyQuery(){
      let _this=this;
      this.$axios({
        method:'get',
        url:'/TeamManagement/check',
        params:{
          team_id:this.$data.ruleForm.password
        }
      }).then(function (response) {
        if(response.data==='yes') {
          _this.$message({
            type: 'success',
            message: '恭喜您!团队已通过申请,请点击我们为您发送的邮件中的连接！'
          })
        }else if(response.data==='ok'){
          _this.$message({
            type: 'success',
            message: '恭喜您!团队已入驻！'
          })
        }else{

          if(response.data==='查询码错误'){
            _this.$message({
              type:'error',
              message:'不存在该查询码！请重试'
            })
          }else{
            // alert('对不起您的审核未通过！原因为:\n'+response.data);
            _this.$router.push({
              path: '/ModifyTeam',
              query: {id: _this.$data.ruleForm.password, message: response.data}
            })
          }
        }
      }).catch((err)=>{
        _this.$message({
          type:'error',
          message:'不存在该查询码！请重试'
        })
      })

    },
    back(){
      this.$router.push({path:'/'})
    },
    ApplyNow(){
      // alert('1');
      this.$router.push({path:'/NewApply'})
    },
    linkto1(){
      this.$router.push({path:'/'});
    },
    linkto2(){
      this.$router.push({path:'/newsCenter'});
    },
    linkto3(){
      this.$router.push({path:'/ApplyEntry'});
    },
    linkto4(){
      this.$router.push({path:'/TeamInfo'})
    },
    linkto5(){
      this.$router.push({path:'/Login'});
    },
    /*handleSelect1(index, indexPath) {
     /!* console.log(index, indexPath);*!/
      switch (index)
      {
        case '1':this.$router.push({path:'/'});break;
        case '2':this.$router.push({path:'/newsCenter'});break;
        case '3':this.$router.push({path:'/ApplyEntry'});break;
        case '4':this.$data.dialogVisible=true;break;
        case '5':this.$router.push({path:'/Login'});break;
      }
    },
    handleSelect2(index,indexPath){
      switch (index)
      {
        case '1':this.$router.push({path:'/ApplyEntry'});break;
        case '2':this.$router.push({path:'/ApplyEntry'});break;
        case '3':this.$router.push({path:'/ApplyEntry'});break;
      }
    },*/
    linkto(){
      this.$data.dialogVisible=false;
      this.$router.push({path:'/'});
    }
  }
}
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:800);
  .text {
    fill: none;
    stroke-width: 2px;
    stroke-linejoin: round;
    stroke-dasharray: 70;
    stroke-dashoffset: 0;
    -webkit-animation: stroke 6s infinite linear;
    animation: stroke 6s infinite linear;
  }
  .text:nth-child(5n + 1) {
    stroke: #2a5caa;
    -webkit-animation-delay: -1.2s;
    animation-delay: -1.2s;
  }
  .text:nth-child(5n + 2) {
    stroke: #5d76ba;
    -webkit-animation-delay: -2.4s;
    animation-delay: -2.4s;
  }
  .text:nth-child(5n + 3) {
    stroke: greenyellow;
    -webkit-animation-delay: -3.6s;
    animation-delay: -3.6s;
  }
  .text:nth-child(5n + 4) {
    stroke: #3d91cc;
    -webkit-animation-delay: -4.8s;
    animation-delay: -4.8s;
  }
  .text:nth-child(5n + 5) {
    stroke: cornflowerblue;
    -webkit-animation-delay: -6s;
    animation-delay: -6s;
  }


  @-webkit-keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }
  @keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }
  /* Other styles */
  html, body {
    height: 100vh;
    min-width: 1200px;
    min-height: 800px;
    margin:0;
    padding: 0;
    width: 100vw;
  }

  svg {
    position: absolute;
    width: 600px;
    /*height: 100%;*/
  }


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height:100%;
  margin: 0;
  padding: 0;
  /*background-color: lightgray;*/
}
/*.a{*/
  /*width: 1500px;*/
  /*height: 150px;*/
  /*!*background: url("./assets/8.jpg") no-repeat center;*!*/
  /*background-size: 100% 100%;*/
/*}*/
/*.menu{
  width:25%;!*导航栏的样式*!
  font-family: "Adobe 黑体 Std R";
  font-size:20px;
  line-height: 20px;
}*/
 /* .img{
    width: 1500px;
    height: 200px;
    background: url("./assets/8.jpg") no-repeat center;
    background-size: 100% 100%;
    opacity: 0.7;
  }*/
</style>
