const todolist = require('../models/todolist')

const getTodolist = async (ctx)=>{
    const id = ctx.params.id
    
    const result = await todolist.getTodolistById(id)
    ctx.body = result
    
    console.log(result[0])
}


const createTodolist = async (ctx)=>{ // 给某个用户创建一条todolist
  const data = ctx.request.body; // post请求，数据是在request.body里的
  console.log(data)
  const result = await todolist.createTodolist(data);
  ctx.body = {
    success: true
  }
}

const removeTodolist = async (ctx)=>{
  const id = ctx.params.id
  const user_id = ctx.params.userId
  const result = await todolist.deleteTodolist(id,user_id)
  ctx.body = {
    success : true
  }
}

const updateTodolist = async (ctx)=>{
  const id = ctx.params.id
  const user_id = ctx.params.userId
  let status = ctx.params.status
  status=="0"?status=true:status=false
  await todolist.updateTodolist(id,user_id,status)
  ctx.body = {
    success : true
  }
}

module.exports = {
  getTodolist,
  createTodolist,
  removeTodolist,
  updateTodolist
}