
import { unescape } from 'querystring';
<template>
    <el-row class="content">
        <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
            <span>
                欢迎：{{name}}!  你的待办事项是：
            </span>
            <el-input placeholder="输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
            <el-tabs v-model="activeName">
                <el-tab-pane label="待办事项" name="first">
                    <el-col :xs="24">
                        <template v-if="!Done">
                            <div v-for="(item, index) in list">
                                <div class="todo-list" v-if="item.status == false">
                                    <span class="item" :title="item.content">
                                        {{index + 1}}. {{item.content}}
                                    </span>
                                    <span class="pull-right">
                                        <el-button size="small" type="primary" @click="update(index)">完成</el-button>
                                        <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                                    </span>
                                </div>
                            </div>
                        </template>
                        <div v-else-if="Done">
                            暂无待办事项
                        </div>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="已完成事项" name="second">
                <template v-if="count > 0">
                    <div v-for="(item, index) in list">
                    <div class="todo-list" v-if="item.status == true">
                        <span class="item finished" :title="item.content">
                        {{ index + 1 }}. {{item.content}}
                        </span>
                        <span class="pull-right">
                        <el-button size="small" type="primary" @click="update(index)">还原</el-button>
                        </span>
                    </div>
                    </div> 
                </template>
                <div v-else>
                    暂无已完成事项
                </div>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>

export default {
    data (){
        return {
            name:"Molunerfinn",
            todos:'',
            activeName:"first",
            list:[],
            count:0
        };
    },
    created(){
        const userinfo = this.getUserInfo()
        if (userinfo != null) {
            this.id = userinfo.id
            this.name = userinfo.name
        }else{
            this.id = this.name = ''
        }
        this.getTodolist()
    },
    computed:{
        Done(){
            let count = 0;
            let length = this.list.length;
            for (let i in this.list) {
                this.list[i].status == true ? count++ :"";
            }
            this.count = count;
            if (count == length || length == 0) {
                return true
            }else{
                return false
            }
        }
        // showname(){
        //     this.name =  this.$store.state.user.name
        //     return this.name
        // }
    },
    methods: {
        addTodos(){
            if(this.todos == "") return
            let obj = {
                id : this.id,
                status : 0,
                content: this.todos
            }
            obj.name = this.name
            
            this.$http.post('/api/todolist',obj)
            .then(res=>{
                if (res.status == 200) {
                    this.$message({
                        type:'success',
                        message : '创建成功'
                    })
                    this.getTodolist()
                }else{
                    this.$message.error('创建失败');
                    
                }
                
            },err=>{
                this.$message.error('创建失败！') // 当没有返回值说明服务端错误或者请求没发送出去
                console.log(err)
            })
            this.todos = ''
        },
        // finished(index){
        //     this.$set(this.list[index],"status",true);
        //     this.$message({
        //         type: "success",
        //         message : "任务完成"
        //     })
        // },
        remove(index) {
            this.$http.delete(`/api/todolist/${this.id}/${this.list[index].id}`)
            .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '任务删除成功！'
            })
            this.getTodolist();
          }else{
            this.$message.error('任务删除失败！')
          }
        }, (err) => {
          this.$message.error('任务删除失败！')
          console.log(err)
        })
            
        },
        update(index) {
            this.$http.put('/api/todolist/'+ this.id + '/' + this.list[index].id + '/' + this.list[index].status)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '任务状态更新成功！'
            })
            this.getTodolist();
          }else{
            this.$message.error('任务状态更新失败！')
          }
        }, (err) => {
          this.$message.error('任务状态更新失败！')
          console.log(err)
        })
        },
        getUserInfo(){
            const user = this.$store.state.user
            //console.log(user)
            return user
        },
        getTodolist(){
            this.$http.get(`/api/todolist/${this.id}`)
            .then(res=>{
                if (res.status == 200) {
                    let con = document.createElement('div')
                    for (let index = 0; index < res.data.length; index++) {
                        con.innerHTML = res.data[index].content
                        res.data[index].content = con.innerText || con.textContent
                    }
                    this.list = res.data
                    con = null
                }
                //console.log(res)
                
            })
        }
    }
}
</script>
<style lang='scss'>
    .el-input{
        margin: 20px auto;
    }
        
    .todo-list{
        width: 100%;
        margin-top: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        text-align: left;
        .item{
            display: inline-block;
            width:50%;
            font-size: 20px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;/*必须和overflow:hidden,连用才有效*/
            &.finished{
                width:80%;
                text-decoration: line-through;
                color: #ddd;
            }
        }
    }
        
    .pull-right{
        float:right;
    }
        
</style>