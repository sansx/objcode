// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'


Vue.use(Vuex)
Vue.use(ElementUI)
Vue.prototype.$http = Axios

Vue.config.productionTip = false //禁止vue启动时提示

/* axios前端拦截器配置 */
Axios.defaults.timeout = 5000
Axios.defaults.baseURL = 'http://149.28.245.204:7999'//dev:8000

/* request & response 拦截器 */
Axios.interceptors.request.use(config=>{
  if (store.state.token) {
    config.headers.Authorization = `Bearer ${store.state.token}`
  }
  return config
},err=>{
  return Promise.reject(err)
})

Axios.interceptors.response.use(response=>{
  return response
},error=>{
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.commit('logout')
        router.replace({
          path:'/'
        })
        break;
    }
  }
  return Promise.reject(error.response)
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
