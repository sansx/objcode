const user = require('../models/user')
//const jwt = require('koa-jwt')
const jwt = require('jsonwebtoken')


const getUserInfo = async function(ctx){
    const id = ctx.params.id
    const result = await user.getUserId(id)
    ctx.body = result
}

const postUserAuth = async function(ctx){
    const data = ctx.request.body
    const userinfo = await user.getUserByName(data.name)

    if (userinfo) {
        
        if (userinfo.password != data.password) {
            ctx.body = {
                success : false,
                info : 'password error'
            }
        }else{
            const info = {
                name : userinfo.user_name,
                id : userinfo.id
            }
            
            const secret = 'secret'
            ctx.body = {
                success : true,
                info : info,
                token : jwt.sign({
                    data : info,
                    exp : Math.floor(Date.now() / 1000) + (60 * 60),
                },secret)
            }
        }
    }else{
        ctx.body = {
            success : false,
            info : 'no such a user'
        }
    }

}



module.exports = {
    getUserInfo,
    postUserAuth
}