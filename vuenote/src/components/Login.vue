
<template>
    <el-row class="content">
        <el-col :xs="24" :sm="{span:6,offset:9}">
            <span class="title">
                欢迎
            </span>
            <el-row>
                <el-input
                v-model = "account"
                placeholder = "账户"
                type = "text">
                </el-input>
                <el-input 
                v-model="password" 
                placeholder="密码"
                type="password"
                @keyup.enter.native="loginToDo"
                >
                </el-input>
                <el-button type="primary" @click="loginToDo">登录</el-button>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>

export default {
        data () {
            return {
                account : "",
                password : ''
            }
        },
        methods:{
            loginToDo(){
                let obj = {
                    name : this.account,
                    password : this.password
                }
                if (this.account&&this.password) {
                    console.log(obj)
                    this.$http.post('/auth/user',obj)
                    .then((res)=>{
                        if (res.data.success) {
                            //console.log(res.data.token)
                            this.$store.commit('login',res.data.token)
                            this.$store.commit('userinfo',res.data.info)
                            this.$router.push("./todolist")
                        }else{
                            this.$message.error(res.data.info)
                            console.log(res.data.info)
                        }
                    })
                    //this.$router.push("./todolist")
                }else{
                    this.$message({
                        type : 'info',
                        message : 'can not be empty '
                    })
                }
                
                
            }
        }
    }
</script>


<style lang='scss' scoped>
    
    .el-row,.content{
        padding:16px;
        
    }
    
    .title{
        font-size:28px;
    }
    
    .el-input{
        margin:12px 0;
    }
    
    .el-button{
        width:100%;
        margin-top:12px;   
    }
     
</style>    