import Vue from 'vue'
import Router from 'vue-router'
import  UserHomePage from'@/components/UserHomePage'
import  newsCenter from'@/components/newsCenter'
import  Login from'@/components/Login'
import  ApplyEntry from'@/components/ApplyEntry'
import  ChangeInfo from'@/components/ChangeInfo'
import TeamInfo from '@/components/TeamInfo'
import NewApply from '../components/NewApply'
import ModifyTeam from '../components/ModifyTeam'
import ApplyInformation from '../components/ApplyInformation'
import ApplyResult from '../components/ApplyResult'
import ConfirmTeam from '../components/ConfirmTeam'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/ConfirmTeam',
      component:ConfirmTeam
    },
    {
      path:'/ApplyResult',
      component:ApplyResult
    },
    {
      path:'/ApplyInformation',
      component:ApplyInformation
    },
    {
      path:'/ModifyTeam',
      component:ModifyTeam
    },
    {
      path:'/NewApply',
      component:NewApply
    },
    {
      path:'/TeamInfo',
      name:'TeamInfo',
      component:TeamInfo
    },
    {
      path:'/',
      name:'UserHomePage',
      component:UserHomePage
    },
    {
      path:'/newsCenter',
      name:'newsCenter',
      component:newsCenter
    },
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/ApplyEntry',
      name:'ApplyEntry',
      component:ApplyEntry
    },
    {
      path:'/ChangeInfo',
      name:'ChangeInfo',
      component:ChangeInfo
    }
  ]
})
