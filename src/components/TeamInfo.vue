<template>
<div class="imgBack">
  <div style="height: 100px;"></div>
  <div class="animated bounceInRight">
    <el-tabs v-model="activeName1" type="border-card" style="width: 60%;margin-left: auto;margin-right: auto;">
      <el-tab-pane label="团队信息" name="1">
        <div class="form">
          <h2>团队信息</h2>
          <el-form  label-width="80px" style="margin-top: 50px;">
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="团队ID:" >
                  <el-input v-model="teamID" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">&emsp; </el-col>
              <el-col :span="9">
                <el-form-item label="团队名称:">
                  <el-input v-model="teamName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <br/>
            <el-row type="flex" class="row-bg">
              <el-form-item label="注册时间:" label-width="110px" >
                <el-col :span="20">
                  <el-date-picker type="date" placeholder="选择日期" v-model="register_date" style="width: 100%;" disabled></el-date-picker>
                </el-col>
              </el-form-item>
              <el-col class="line" :span="3">&emsp;</el-col>
              <el-form-item label="注册时间" label-width="130px">
                <el-col :span="20">
                  <el-date-picker type="date" placeholder="选择日期" v-model="register_date" style="width: 100%;" disabled></el-date-picker>
                </el-col>
              </el-form-item>
            </el-row>
            <br/>
            <el-row type="flex" class="row-bg">
              <el-col :span="9">
                <el-form-item label="项目类型:">
                  <el-radio-group v-model="projectType" disabled>
                    <el-radio label="自选"></el-radio>
                    <el-radio label="竞赛"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="3">&emsp;</el-col>
              <el-col :span="11">

              </el-col>
            </el-row>

            <br/>
            <el-tabs tab-position="left" style="height: 200px;">
              <el-tab-pane label="小组成员">
                <!--<el-button @click="dialogVisible=true">新增成员</el-button>-->
                <el-table
                  max-height="280px"
                  :data="members"
                  style="width: 100%">
                  <el-table-column
                    prop="student_name"
                    label="姓名"
                    width="135">
                  </el-table-column>
                  <el-table-column
                    prop="student_id"
                    label="学号"
                    width="135">
                  </el-table-column>
                  <el-table-column
                    prop="attendance_number"
                    label="考勤号"
                    width="135">
                  </el-table-column>
                  <el-table-column
                    prop="room_no"
                    label="房间号"
                    width="135">
                  </el-table-column>
                  <el-table-column
                    prop="seat_no"
                    label="座位号"
                    width="135">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="项目简述" >
                <el-input type="textarea" :rows="9" v-model="projectBrief" :disabled="true"></el-input>
              </el-tab-pane>
              <el-tab-pane label="主营业务">
                <el-input type="textarea" :rows="9"  v-model="projectDirector" :disabled="true"></el-input>
              </el-tab-pane>
              <el-tab-pane label="前期基础">
                <el-input type="textarea" :rows="9"  v-model="workFoundstion" :disabled="true"></el-input>
              </el-tab-pane>
              <el-tab-pane label="项目计划">
                <el-input type="textarea" :rows="9"  v-model="plan" :disabled="true"></el-input>
              </el-tab-pane>
            </el-tabs>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="2">
        <div style="height: 600px;width: 600px;text-align: left">
          <div style="margin-left: auto;margin-right: auto;width: 400px;">
            <el-card style="width: 400px;">
              <el-form :model="formModifyPassword" ref="formModifyPassword" :status-icon="true" label-width="120px">
                <el-form-item prop="oldPassword" label="旧密码:">
                  <el-input v-model="formModifyPassword.oldPassword" placeholder="请输入旧密码" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword" label="新密码:">
                  <el-input v-model="formModifyPassword.newPassword" placeholder="请输入新密码" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item prop="repeatNewPassword" label="重复新密码:">
                  <el-input v-model="formModifyPassword.repeatNewPassword" placeholder="请再次输入新密码" style="width: 220px;"></el-input>
                </el-form-item>
              </el-form>
              <div style="margin-left: 50px;">
                <el-button type="danger" @click="SubmitPasswordModify">确认修改</el-button>
              </div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="反馈意见" name="3">
        <div style="width: 600px;height: 600px">

          <el-form :model="formFeedBack" ref="formFeedBack" label-width="120" :status-icon="true" :rules="rulesFeed">
            <el-form-item label="反馈标题" prop="title" class="form-item">
              <el-input v-model="formFeedBack.title" placeholder="请输入反馈标题" style="width: 220px;" prefix-icon="el-icon-news"> </el-input>
            </el-form-item>
            <el-form-item label="反馈类型" prop="type" class="form-item">
              <el-select v-model="formFeedBack.type" placeholder="请选择反馈类型">
                <el-option :value="1" label="成员变更">成员变更</el-option>
                <el-option :value="2" label="信息修改">信息修改</el-option>
                <el-option :value="3" label="团队变更">团队变更</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="具体内容" prop="content">
              <el-input type="textarea" v-model="formFeedBack.content" rows="10"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" round @click="SubmitFeed">确定提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
    export default {
        name: "TeamInfo",
        props(){

        },

        data() {
        return {
          teamid:123,
          activeName1:'1',
          formFeedBack:{
            title:'',
            type:'',
            content:''
          },
          rulesFeed:{

          },
          formModifyPassword:{
            oldPassword:'',
            newPassword:'',
            repeatNewPassword:''
          },
          dialogVisible1:false,
          dialogVisible:false,
          teamID:'',            //团队ID
          teamName: '',         //团队名称
          projectName:'',       //项目名称
          teacher:'',           //带队老师
          belondField:'',       //所属领域
          projectType:'',       //项目类型
          projectBrief:'',      //项目简介
          projectDirector:'',   //主营业务
          workFoundstion:'',    //前期基础

          plan:'',              //项目计划
          register_date:'',      //注册日期
          auditOpinion:'',      //审核意见：‘未审核’‘已同意’‘已拒绝’
          submitDate:'',        //申请提交日期
          enterDueDate:'',      //申请截止日期
          members:[{
            student_name:'',
            student_id:'',
            attendance_number:'',
            room_no:'',
            seat_no:'',
          },],
        }
       },
      created(){

          this.$data.teamid=this.$route.query.id;

          let _this=this;
          this.$axios({
            method:'get',
            url:'/TeamManagement/getTeamMore',
            params:{
              team_id:this.$data.teamid
            }
          }).then(function(response){
            console.log(response);
            _this.$data.teamID=response.data.team_id;
            _this.$data.projectDirector=response.data.project_director;
            _this.$data.projectBrief=response.data.project_brief
            _this.$data.workFoundstion=response.data.work_foundation;
            _this.$data.belondField=response.data.belong_field
            _this.$data.register_date=response.data.register_date;
            _this.$data.teamName=response.data.team_name;
            _this.$data.members=response.data.memberMessages;
            _this.$data.plan=response.data.plan
            _this.$data.projectType=response.data.project_type;
            console.log(_this.$data.members);
          }).catch(function(error){

          });
      },
       methods: {
          SubmitPasswordModify(){
            if(this.$data.formModifyPassword.repeatNewPassword!==this.$data.formModifyPassword.newPassword){
              this.$message({
                type:'error',
                message:'两次输入密码不一致'
              })
            }else{
              let _this=this;
              this.$axios({
                method:'get',
                url:'/formalTeam/changePassword',
                params:{
                  teamid:this.$data.teamID,
                  oldPassword:this.$data.formModifyPassword.oldPassword,
                  newPassword:this.$data.formModifyPassword.newPassword
                }
              }).then(function (response) {
                if(response.data===true){
                  _this.$message({
                    type:'success',
                    message:'密码修改成功！'
                  })
                  _this.$data.formModifyPassword.oldPassword='';
                  _this.$data.formModifyPassword.newPassword='';
                  _this.$data.formModifyPassword.repeatNewPassword='';
                }else{
                  _this.$message({
                    type:'error',
                    message:'修改失败！请检查原密码是否正确'
                  })
                }
              })
            }
          },
          SubmitFeed(){
            let _this=this;
            this.$axios({
              method:'get',
              url:'/formalTeam/submitRequest',
              params:{
                team_id:this.$data.teamid,
                title:this.$data.formFeedBack.title,
                content:this.$data.formFeedBack.content,
                type:this.$data.formFeedBack.type
              }
            }).then(function (response) {
              if(response.data===true){
                _this.$message({
                  type:'success',
                  message:'反馈成功！'
                })
                _this.$data.formFeedBack.title='';
                _this.$data.formFeedBack.type='';
                _this.$data.formFeedBack.content='';
              }else{
                _this.$message({
                  type:'error',
                  message:'反馈失败！'
                })
              }
            })
          }
      }
    }
</script>

<style scoped>

  .form-item{
    width: 300px;

  }

  .imgBack{
    margin: 0;
    background-image: url("../assets/timg2.jpg");
    background-size: 100%;
    width: 100%;
    height: 470px;
  }
 /* .button{
    margin-top: 40px;
    margin-bottom: 40px;
   margin-left: 50px;
   margin-right: 30px;
    margin-bottom: 70px;
    opacity: 1.0;
    color: white;
    background-color: #0f2162;
  }*/
  .form{
    text-align: left;
    /*padding-top: 20px;*/
    /*margin-top: 30px;*/
    float:left;
    width:100%;
    margin-right: auto;
    margin-right: auto;
   /* border-width: 1.5px;
    border-style: solid;
    border-radius: 20px;
    border-color: #808080;*/
  }
</style>
