// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import intro from 'intro.js'
import axios from 'axios'
import animate from 'animate.css'
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.$axios=axios

Vue.use(ElementUI)
axios.defaults.withCredentials=true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created(){
    this.$axios.defaults.baseURL='http://59.77.7.63:8081/';
    this.$axios.defaults.withCredentials=true;
    Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
      request.credentials = true;
      next()
    })
  },

  components: { App },
  template: '<App/>'
  //携带cookie

})
