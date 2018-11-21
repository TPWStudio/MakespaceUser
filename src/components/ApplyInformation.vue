<template>
  <div id="ApplyInformation">
  <!--申请之后的页面-->
    <div class="backImgApplyInformation">
      <el-card style="width: 600px;height: 400px;margin-left: auto;margin-right: auto;margin-top: 100px;">
        <!--<span style="font-size: 26px;">您的查询申请账号为:</span><br/>-->
          <!--<div style="margin-top: 5px;">-->
            <!--<span>此查询码可用来查询申请的进展以及通知，请及时保存</span>-->
          <!--</div>-->
        <!--<div class="fonts-card">-->
          <!--<span style="font-family: 'Arial Unicode MS';font-size: 70px;">{{account}}</span>-->
        <!--</div>-->
        <div style="margin-top: 60px;">
          <!--<span style="text-align: left;font-size: 40px;">第二步</span><br/>-->
          <label style="color:red;font-weight: bold">*</label><span style="font-weight: bold;font-size: 24px;">第二步：请以上传相关文件:</span>
          <el-upload
            class="upload-demo"
            :action="$axios.defaults.baseURL+'file/uploadFile'"
            :with-credentials="true"
            :before-upload="beforeAvatarUpload"
            multiple
            :limit="1">
            <br/>
            <el-button type="primary" size="small" plain><i class="el-icon-upload"/>上传文件</el-button>
            <div slot="tip" class="el-upload__tip">
              上传的文件命名时请以团队名命名<br/>
              请上传申请书，策划书及其他对项目情况审核有帮助的材料<br/>
              建议使用zip格式,只能上传一个文件，文件大小限制为10mb<br/>
            </div>
          </el-upload>
        </div>
        <div style="margin-top: 40px;">
          <el-button type="primary" @click="linkTo">下一步</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ApplyInformation",
      data(){
        return{
          account:'31529'
        }
      },
      created(){
        if(this.$route.query.account){
          this.$data.account=this.$route.query.account;
        }else{

        }
      },
      methods:{
        linkTo(){
          this.$router.push({path:'/ApplyResult',query:{account:this.$data.account}});
        },
        beforeAvatarUpload(file){
          console.log(file.type);
          // const isZip = file.type==='application/octet-stream';//(file.type === 'application/x-zip-compressed'||
          const isLt10M = file.size / 1024 / 1024 < 10;
          if(!isLt10M){
            this.$message.error('上传文件大小不能超过 10MB!');
          }
          return isLt10M;
        }
      }
    }
</script>

<style scoped>
  .fonts-card{
    height: 160px;
    width: 300px;
    /*background-color: darkslateblue;*/
    margin-right: auto;
    margin-left: auto;
    /*margin-top: 40px;*/
    text-align: center;
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
