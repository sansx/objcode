const db = require('../config/db')
    ,todoModule = '../schema/list.js'
    ,TodolistDb = db.TodoList
    ,Todolist = TodolistDb.import(todoModule)
    ,xss = require('xss')
const getTodolistById = async (id)=>{
    const todolist = await Todolist.findAll({
        where:{
            user_id : id
        },
        attributes: ['id','content','status']
    }).then(res=>{
        for (let index = 0; index < res.length; index++) {
            res[index].dataValues.content = xss(res[index].dataValues.content)
        }
        return res
    })
    
    return todolist
}

const createTodolist = async (data)=>{
    
    await Todolist.create({
        user_id : xss(data.id),
        content : xss(data.content),
        status : data.status
    })
    return true 
}

const deleteTodolist = async (id,user_id)=>{
    await Todolist.destroy({
        where:{
            id,
            user_id
        }
    })
    return true
}

const updateTodolist = async (id,user_id,status)=>{
    await Todolist.update(
        {
            status
        },
        {
            where:{
                id,
                user_id
            }
        }
        
    )
    return true
}


module.exports = {
    getTodolistById,
    createTodolist,
    deleteTodolist,
    updateTodolist
}

