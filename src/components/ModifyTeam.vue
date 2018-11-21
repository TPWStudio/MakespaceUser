<template>
  <div>

  <el-dialog :visible.sync="detailsVisible" title="修改申请表">
    <el-card>
    <div style="text-align: left">
    <span style="font-size: 20px;font-weight: bold">修改意见</span><br/><br/>
      <span>--{{disagreement}}</span>
    </div>
    </el-card>
    <div style="height: 20px;"></div>
    <el-form ref="detailsForm" :model="detailsForm" label-width="80px"  :rules="submitRules">
      <div>
        <!--表单头部信息-->
        <el-row type="flex" style="margin-left: 10px;">
          <el-col :span="9">
            <el-form-item label="团队名称:" label-width="100px;" prop="teamName">
              <el-input v-model="detailsForm.teamName"  ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">&emsp;&emsp;</el-col>
          <el-col :span="6">
            <el-form-item label="所属领域:"label-width="100px;" prop="belondField">
              <el-select v-model="detailsForm.belongField">
                <el-option v-for="item in belongFieldData" :key="item.value" :value="item.value" :label="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <br/>
        <el-row type="flex" style="margin-left: 10px;">
          <el-col :span="9">
            <el-form-item label="项目名称:"label-width="120px;" prop="projectName">
              <el-input v-model="detailsForm.projectName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">&emsp;&emsp; </el-col>
          <el-col :span="6">
            <el-form-item label="项目类型:" label-width="120px;" prop="projectType">
              <el-select v-model="detailsForm.projectType" >
                <el-option v-for="item in projectTypes" :key="item.value" :value="item.value" :label="item.value" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!--边界-->
      <div clas="rowBorder1" style="width:100%;height:40px;">
        <div class="colBorder1"></div>
        <div class="colBorder1" style="background: #e5e9f2;"></div>
      </div>
      <!--成员信息表格-->
      <div style="border-radius: 6px;height:40px; margin-top: 10px;">
        <div style="width:95%;"align="left">
          <p style="font-size:18px;margin-top: 20px;color:#409EFF;">成员（第一名为项目负责人）<i class="el-icon-arrow-down"/></p>
        </div>
        <div style="display: inline-block;width:45%;float: left;text-align: left">
          <el-button  type="primary" size="small" @click="dialogNewStuVisible=true" plain>添加成员</el-button>
        </div>
      </div>
      <div style="margin-top: 30px;">
        <el-table  :data="detailsForm.tempMembers" stripe   style="width: 100%;margin-top: 20px;"max-height="200">
          <el-table-column prop="studentName" label="姓名" width="100"></el-table-column>
          <el-table-column prop="studentId" label="学号" width="130"></el-table-column>
          <el-table-column prop="teamId" label="团队号" width="90"></el-table-column>
          <el-table-column prop="educationBackground" label="学历" width="90"></el-table-column>
          <el-table-column prop="phoneNumber" label="电话" width="130"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="130"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope" >
              <el-button type="primary" circle @click="modifyStudent(scope.$index)">修改</el-button>
              <el-button type="danger" circle @click="deleteStudent(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--边界-->
      <div class="rowBorder2" style="width:100%;height:40px;margin-top: 50px;">
        <div class="colBorder2"></div>
        <div class="colBorder2" style="background: #e5e9f2;"></div>
        <div class="colBorder2"></div>
      </div>
      <!--尾部信息表单-->
      <div style="margin-top: 40px;width:95%;">
        <el-tabs tab-position="top" style="height: 250px;">
          <el-tab-pane label="项目简述" >
            <el-form-item prop="projectBrief" label-width="0px;">
              <el-input type="textarea" :rows="9" v-model="detailsForm.projectBrief" ></el-input>
              <span class="num-of-input" v-if="numOfBrief>0">还可输入{{numOfBrief}}字</span>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="主营业务">
            <el-form-item prop="projectDirector" label-width="0px;">
              <el-input type="textarea":rows="9"  v-model="detailsForm.projectDirector" ></el-input>
              <span class="num-of-input" v-if="numOfDirector>0">还可输入{{numOfDirector}}字</span>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="前期基础">
            <el-form-item prop="workFoundation" label-width="0px;">
              <el-input type="textarea":rows="9"  v-model="detailsForm.workFoundation" ></el-input>
              <span class="num-of-input" v-if="numOfFoundation>0">还可输入{{numOfFoundation}}字</span>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="项目计划">
            <el-form-item prop="plan" label-width="0px;">
              <el-input type="textarea":rows="9"  v-model="detailsForm.plan"></el-input>
              <span class="num-of-input" v-if="numOfPlan>0">还可输入{{numOfPlan}}字</span>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="width:97%;margin-top: 70px;" align="left">
        <div style="color:#409EF0;margin-top: 10px;"><label style="color:red">*</label>请上传相关文件<span v-if="detailsForm.filePath==='yes'" style="color: yellowgreen">（您已上传文件，可以重复上传）</span>
          <span v-if="detailsForm.filePath==='no'" style="color: red">（您尚未上传文件）</span>:<br/>
          <div style="margin-top: 10px;" v-if="detailsForm.filePath!=='no'">
          <span style="font-size: 12px;">已上传文件列表：</span><br/>
            <div><a :href="detailsForm.filePath">{{detailsForm.fileName}}</a></div>
          </div>

          <br/>
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
            请上传申请书，策划书及其他对项目情况审核有帮助的材料<br/>
            支持zip格式，文件大小请小于10MB<br/>
          </div>
          </el-upload>
        </div>
      </div>
      <div align="right" style="margin-top: 40px;margin-bottom: 70px;" >
        <el-button  type="info" @click="submitAgain">重新提交</el-button>
      </div>
    </el-form>
  </el-dialog>
    <el-dialog :visible.sync="dialogNewStuVisible" title="新增成员" style="width: 800px;height: 800px;" center :show-close="false">
      <el-form ref="formNewStu" :model="formNewStu" label-width="110px" :rules="rulesNewStudent">
        <el-form-item prop="studentName" label="成员姓名:">
          <el-input v-model="formNewStu.studentName" style="width: 200px;">
          </el-input>
        </el-form-item>
        <el-form-item prop="studentId" label="成员学号:">
          <el-input v-model="formNewStu.studentId" style="width: 200px;">
          </el-input>
        </el-form-item>
        <el-form-item prop="educationBackground" label="学历:">
          <el-input v-model="formNewStu.educationBackground" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="电话:">
          <el-input v-model.number="formNewStu.phoneNumber" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:">
          <el-input v-model="formNewStu.email" style="width: 200px;" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addNewStudent">确定</el-button>
          <el-button type="danger" @click="dialogNewStuVisible=false">放弃</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogModStuVisible" title="修改成员" style="width: 800px;height: 800px;" center>
      <el-form ref="formModifyStu" :model="formModifyStu" label-width="110px" :rules="rulesNewStudent">
        <el-form-item prop="studentName" label="成员姓名:">
          <el-input v-model="formModifyStu.studentName" style="width: 200px;">
          </el-input>
        </el-form-item>
        <el-form-item prop="studentId" label="成员学号:">
          <el-input v-model="formModifyStu.studentId" style="width: 200px;">
          </el-input>
        </el-form-item>
        <el-form-item prop="educationBackground" label="学历:">
          <el-input v-model="formModifyStu.educationBackground" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="电话:">
          <el-input v-model.number="formModifyStu.phoneNumber" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:">
          <el-input v-model="formModifyStu.email" style="width: 200px;" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SubmitModifyStudent">确定</el-button>
          <el-button type="danger" @click="dialogModStuVisible=false">放弃</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ApplyManage",
    computed:{
      numOfBrief:function () {
        return 500-this.$data.detailsForm.projectBrief.length;
      },
      numOfDirector:function () {
        return 500-this.$data.detailsForm.projectDirector.length;
      },
      numOfFoundation:function () {
        return 500-this.$data.detailsForm.workFoundation.length;
      },
      numOfPlan:function () {
        return 500-this.$data.detailsForm.plan.length;
      }
    },
    data(){
      return{
        headers:{
          'Content-Type':'multipart/form-data;charset=UTP*'
        },
        Register:{
          account:'',
          ok:'ok',
          message:'message'
        },
        projectTypes:[
          {value:'金融'},
          {value:'医疗'},
          {value:'教育'},
          {value:'文化'},
          {value:'其他'}
        ],
        belongFieldData:[
          {value:'竞赛'},
          {value:'科研'},
          {value:'其他'}
        ],
        submitRules:{        //主表单验证
          teamName:[
            { validator:(rule,value,callback)=>{
                if(/^[\u4e00-\u9fa5A-Za-z0-9-_]{1,}$/.test(value) == false){
                  callback(new Error("请输入您的团队名称"));
                }else{
                  callback();
                }
              },required: true, trigger: '' },
          ],
          belondField: [
            { validator:(rule,value,callback)=>{
                if(/^[\u4e00-\u9fa5A-Za-z0-9-_]{1,}$/.test(value) == false){
                  callback(new Error("选择所属领域"));
                }else{
                  callback();
                }
              },required: true, trigger: '' },
          ],
          projectName:[
            { validator:(rule,value,callback)=>{
                if(/^[\u4e00-\u9fa5A-Za-z0-9-_]{1,}$/.test(value) == false){
                  callback(new Error("请输入项目名称"));
                }else{
                  callback();
                }
              },required: true, trigger: '' },
          ],
          projectType:[
            { validator:(rule,value,callback)=>{
                if(/^[\u4e00-\u9fa5A-Za-z0-9-_]{1,}$/.test(value) == false){
                  callback(new Error("选择项目类型"));
                }else{
                  callback();
                }
              },required: true, trigger: '' },
          ],
          projectBrief:[
            {required: true, trigger: 'change',message:'输入不能为空' },
            {max:500,trigger:'change',message:'输入超过500字限制'}
          ],
          projectDirector:[
            { required: true, trigger: 'change',message:'输入不能为空' },
            {max:500,trigger:'change',message:'输入超过500字限制'}
          ],
          workFoundation:[
            {required: true, trigger: 'change',message:'输入不能为空' },
            {max:500,trigger:'change',message:'输入超过500字限制'}
          ],
          plan:[
            {required: true, trigger: 'change',message:'输入不能为空' },
            {max:500,trigger:'change',message:'输入超过500字限制'}
          ],
        },
        dialogNewStuVisible:false,
        dialogModStuVisible:false,
        formNewStu:{
          studentName:'',
          studentId:'',
          teamId:'',
          educationBackground:'',
          phoneNumber:'',
          email:''
        },
        formModifyStu:{
          studentName:'',
          studentId:'',
          teamId:'',
          educationBackground:'',
          phoneNumber:'',
          email:''
        },
        disagreement:'',
        reason:'',
        loading:true,
        teams:[
        ],
        showTable:[                   //表内显示的数据
        ],
        none:[],

        detailsForm:{                //详情显示表单
        },
        teamNum:0,                //团队数
        noAuditNum:0,             //未审核数目
        refusedNum:0,             //已拒绝数目
        detailsVisible:false,
        currentPage:1,
        pagesize:1,               //每个分页行数
        index:'',                 //被查看团队的序列
        state:'',                 //被查看团队审核的审核状况,
        phones:'',
        dialogVisible:false,
        /**
         * 添加学生表单验证
         */
        rulesNewStudent:{
          studentName:[
            {required:true,message:'姓名不能为空',trigger:'change'}
          ],
          studentId:[
            {required:true,message:'学号不能为空',trigger:'change'}
          ],
          educationBackground:[
            {required:true,message:'学历不能为空',trigger:'change'}
          ],
          phoneNumber:[
            {required:true,message:'请输入正确的手机号码',pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,trigger:'change'}
          ],
          email:[
            {required:true,message:'请输入正确的邮箱',pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,trigger:'change'}
          ]
        }

      }
    },
    created(){
      this.$data.detailsVisible=true;
      this.$data.disagreement=this.$route.query.message;
      let _this=this;
      this.$axios({
        method:'get',
        url:'/TeamManagement/TempTeamMore',
        params:{
          team_id:this.$route.query.id,
        }
      }).then(function(response){
        _this.$data.detailsForm=response.data;
        _this.$data.Register.account=response.data.teamId
      });
    }
    ,
    methods:{
      /**
       * 新增一个小组成员
       */
      addNewStudent(){
        let _this=this;
        this.$refs['formNewStu'].validate((valid)=>{
          this.$data.detailsForm.tempMembers.push({
            studentName:this.$data.formNewStu.studentName,
            studentId:this.$data.formNewStu.studentId,
            teamId:this.$data.detailsForm.teamId,
            educationBackground:this.$data.formNewStu.educationBackground,
            phoneNumber:this.$data.formNewStu.phoneNumber,
            email:this.$data.formNewStu.email
          });
          this.$data.dialogNewStuVisible=false;

          this.$data.formNewStu.studentName='';
          this.$data.formNewStu.studentId='';
          this.$data.formNewStu.email='';
          this.$data.formNewStu.phoneNumber='';
          this.$data.formNewStu.educationBackground='';
        })
      },
      /**
       * 修改小组成员
       * @param index
       */
      modifyStudent(index){
        this.$data.index=index;
        this.$data.formModifyStu=this.$data.detailsForm.tempMembers[index];
        this.$data.dialogModStuVisible=true;
      },
      /**
       * 提交修改成员
       * @constructor
       */
      SubmitModifyStudent(){
        // this.$data.detailsForm.tempMembers.splice(this.$data.index,1);
        // this.$data.detailsForm.tempMembers.push(this.$data.formModifyStu);
        this.$data.detailsForm.tempMembers[this.$data.index].studentName=this.$data.formModifyStu.studentName;
        this.$data.detailsForm.tempMembers[this.$data.index].studentId=this.$data.formModifyStu.studentId;
        this.$data.detailsForm.tempMembers[this.$data.index].teamId=this.$data.formModifyStu.teamId;
        this.$data.detailsForm.tempMembers[this.$data.index].educationBackground=this.$data.formModifyStu.educationBackground;
        this.$data.detailsForm.tempMembers[this.$data.index].phoneNumber=this.$data.formModifyStu.phoneNumber;
        this.$data.detailsForm.tempMembers[this.$data.index].email=this.$data.formModifyStu.email;
        this.$data.dialogModStuVisible=false;
      },
      deleteStudent(index){     //删除一条记录
        this.$data.detailsForm.tempMembers.splice(index,1);
      },
      beforeAvatarUpload(file){
        console.log(file.type);
        const isZip = file.type === 'application/x-zip-compressed';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if(!isLt10M){
          this.$message.error('上传文件大小不能超过 10MB!');
        }
        return isLt10M;
      },
     submitAgain(){
        this.$refs['detailsForm'].validate((valid)=>{
          if(valid){
            let submit=[];
            console.log(this.$data.detailsForm)
            let _this=this;
            for(let index=0;index<this.$data.detailsForm.tempMembers.length;index++){
              var memberModel=new Object();
              memberModel.name=this.$data.detailsForm.tempMembers[index].studentName;
              memberModel.student_id=this.$data.detailsForm.tempMembers[index].studentId;
              memberModel.college=this.$data.detailsForm.tempMembers[index].college;
              memberModel.education_background=this.$data.detailsForm.tempMembers[index].educationBackground;
              memberModel.phone=this.$data.detailsForm.tempMembers[index].phoneNumber;
              memberModel.email=this.$data.detailsForm.tempMembers[index].email;

              submit.push(memberModel)
            }

            console.log(submit);


            let flag=true;
            for(let index=0;index<submit.length;index++){
              for(let i=index+1;i<submit.length;i++){
                if(submit[index].student_id===submit[i].student_id){
                  flag=false;
                }
              }
            }

            if(submit.length===0){
              flag=false;
            }

            if(flag===false){
              this.$message({
                type:'error',
                message:'组员信息有重复或没有加入任何组员'
              })
            }else {
              this.$data.isSubmit = true;


              this.$axios({
                method: 'post',
                url: '/TeamManagement/submitAgain',
                data: {
                  team_name: this.$data.detailsForm.teamName,
                  project_name: this.$data.detailsForm.projectName,
                  belong_field: this.$data.detailsForm.belongField,
                  project_type: this.$data.detailsForm.projectType,
                  project_brief: this.$data.detailsForm.projectBrief,
                  project_derector: this.$data.detailsForm.projectDirector,
                  plan: this.$data.detailsForm.plan,
                  work_foundation: this.$data.detailsForm.workFoundation,
                  newStudents: submit,
                  teamid: this.$data.detailsForm.teamId
                }
              }).then(function (response) {
                if (response.data.ok === 'true') {
                  alert('申请成功！您的申请验证码为' + response.data.account);
                  _this.$router.push({path: '/'});
                } else {
                  _this.$message({
                    type: 'error',
                    message: '申请失败！请查看是否在申请期内'
                  })
                }
              })

            }
          }
        })






     }

    }
  }
</script>

<style scoped>

  .num-of-input{
    text-align: left;
    font-size: 12px;
  }

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
