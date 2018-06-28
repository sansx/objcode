const db = require('../config/db.js'),
    userModel = '../schema/user',
    todolistdb = db.TodoList,
    user = todolistdb.import(userModel);


const getUserId = async function (id) {
    const userInfo = await user.findOne({
        where:{
            id
        }
    });
    return userInfo
}

const getUserByName = async function(name){
    const userInfo = await user.findOne({
        where:{
            user_name : name
        }
    });
    return userInfo
}

module.exports = {
    getUserId,
    getUserByName
}