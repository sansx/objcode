const Sequelize = require('sequelize')

// const TodoList = new Sequelize('mysql://root:root@localhost/test',{
//     define:{
//         timestamps : false
//     }
// })
const TodoList = new Sequelize('test', 'root', 'root',{
    host: 'localhost',
    dialect :'mysql',
    define:{
        timestamps : false
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
})
module.exports = {
    TodoList
}