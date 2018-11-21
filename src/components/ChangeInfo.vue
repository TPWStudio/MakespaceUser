<template>
  <div style="margin-top: 150px" class="backImg">
    <div style="text-align: right;margin-top: 50px;margin-right: 20px"><el-button type="primary" round>点击修改</el-button></div>
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row type="flex" class="row-bg">
          <el-col :span="8">
            <el-form-item label="团队ID:" >
              <el-input v-model="form.teamID" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">&emsp;</el-col>
          <el-col :span="9">
            <el-form-item label="团队名称:">
              <el-input v-model="form.teamName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <br/>
        <el-row type="flex" class="row-bg">
          <el-col :span="8">
            <el-form-item label="所属领域:">
              <el-input v-model="form.belondField" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">&emsp; </el-col>
          <el-col :span="9">
            <el-form-item label="带队教师:">
              <el-input v-model="form.teacher" placeholder="带队教师" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <br/>
        <el-row type="flex" class="row-bg">
          <el-form-item label="申请提交时间:" label-width="110px" >
            <el-col :span="20">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.submitDate" style="width: 100%;" disabled></el-date-picker>
            </el-col>
          </el-form-item>
          <el-col class="line" :span="3">&emsp;</el-col>
          <el-form-item label="申请确认截止时间:" label-width="130px">
            <el-col :span="20">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.enterDueDate" style="width: 100%;" disabled></el-date-picker>
            </el-col>
          </el-form-item>
        </el-row>
        <br/>
        <el-row type="flex" class="row-bg">
          <el-col :span="9">
            <el-form-item label="项目类型:">
              <el-radio-group v-model="form.projectType" disabled>
                <el-radio label="自选"></el-radio>
                <el-radio label="竞赛"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="3">&emsp;</el-col>
          <el-col :span="11">
            <el-form-item label="审核意见:">
              <el-radio-group v-model="form.auditOpinion" disabled>
                <el-radio label="未审核"></el-radio>
                <el-radio label="已同意"></el-radio>
                <el-radio label="已拒绝"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <br/>
        <el-tabs tab-position="left" style="height: 200px;">
          <el-tab-pane label="小组成员">
            <el-table
              max-height="280px"
              :data="members"
              style="width: 100%">
              <el-table-column
                prop="stuName"
                label="姓名"
                width="135">
              </el-table-column>
              <el-table-column
                prop="stuID"
                label="学号"
                width="135">
              </el-table-column>
              <el-table-column
                prop="attendenceNO"
                label="考勤号"
                width="135">
              </el-table-column>
              <el-table-column
                prop="roomNO"
                label="房间号"
                width="135">
              </el-table-column>
              <el-table-column
                prop="seatNO"
                label="座位号"
                width="135">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="项目简述" >
            <el-input type="textarea" :rows="9" v-model="form.projectBrief" disabled></el-input>
          </el-tab-pane>
          <el-tab-pane label="主营业务">
            <el-input type="textarea":rows="9"  v-model="form.projectDirector" disabled></el-input>
          </el-tab-pane>
          <el-tab-pane label="前期基础">
            <el-input type="textarea":rows="9"  v-model="form.workFoundstion" disabled></el-input>
          </el-tab-pane>
          <el-tab-pane label="项目计划">
            <el-input type="textarea":rows="9"  v-model="form.plan" disabled></el-input>
          </el-tab-pane>
        </el-tabs>

      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TeamInfo",
    /*props(){

    },*/
    data() {
      return {
        form: {
          teamID:'666',            //团队ID
          teamName: '创客',         //团队名称
          projectName:'大创',       //项目名称
          teacher:'teacher',           //带队老师
          belondField:'App',       //所属领域
          projectType:'自选',       //项目类型
          projectBrief:'',      //项目简介
          projectDirector:'',   //主营业务
          workFoundstion:'',    //前期基础
          plan:'',              //项目计划
          registerDate:'2018-2-1',      //注册日期
          auditOpinion:'未审核',      //审核意见：‘未审核’‘已同意’‘已拒绝’
          submitDate:'2018-2-1',        //申请提交日期
          enterDueDate:'2018-5-1',      //申请截止日期
        },
        members:[{
          stuName:'hhh',
          stuID:'00001',
          attendenceNO:'243001',
          roomNO:'01',
          seatNO:'01',
        },
          {
            stuName:'aaa',
            stuID:'00001',
            attendenceNO:'243001',
            roomNO:'01',
            seatNO:'01',
          }
        ]
      }
    },
    created(){
      this.$axios({
        method:'get',
        url:'/',
      }).then(function(response){

      }).catch(function(error){

      });
    },
    methods: {
    }
  }
</script>

<style scoped>
  .backImg{
    background-image: url("../assets/timg2.jpg");
    width: 100%;
    background-size: cover;
    height: 400px;
  }
  .form{
    padding-top: 20px;
    margin-top: 30px;
    float:left;
    width:75%;
    margin-left: 50px;
  }
</style>

