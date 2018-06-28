
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoList from '../components/TodoList'
import Login from '../components/Login'
import store from '../vuex/store'


Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'HelloWorld',
      component: Login
    },
    {
      path:'/todolist',
      component: TodoList,
      meta:{
        requiresAuth:true,
      }
    },
    {
      path:'/404',
      component : HelloWorld
    },
    {
      path:'*',
      redirect : '/404'
      
    }
  ]

const router = new Router({
  routes
})
if (window.localStorage.getItem('token')) {
  
    const data = JSON.parse(window.localStorage.getItem('user'))
    store.commit("login", window.localStorage.getItem('token'))
    store.commit("userinfo", data)

}

router.beforeEach((to,form,next)=>{
  const token = store.state.token
  if (token) {
    Vue.prototype.$http.defaults.headers.Authorization = 'Bearer ' + token
  }
  console.log(to.path)
  if (to.meta.requiresAuth) {
    if(token){
      next()
    }else{
      next({
            path: '/',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
  }else{
    if (token&&to.path == '/') {
      next({
        path:'/todolist'
      })
    }else{
      next()
    }
  }
})


export default router
