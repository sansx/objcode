import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user : {},
        token : null,
    },
    mutations:{
        login (state,info){
            
            localStorage.token = info
            state.token = info
        },
        logout (state){
            localStorage.removeItem('token')
            state.token = null
        },
        userinfo (state,data){
            /* localStorage.username = data.name
            localStorage.userid = data.id */
            //console.log(data.name +','+typeof data)
            localStorage.user = JSON.stringify(data) 
            state.user.name = data.name
            state.user.id = data.id
        }
    }
})

export default store
