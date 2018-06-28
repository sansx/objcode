/* import Koa from 'koa'
import json from 'koa-json'
import logger from 'koa-logger'
import auth from './server/routes/auth.js'
import api from './server/routes/api.js'
import jwt from 'koa-jwt'
import path from 'path'
import serve from 'koa-static'
import historyApiFallback from 'koa2-history-api-fallback'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser' */
const Koa = require('koa')
    ,koaRouter = require('koa-router')
    ,koaBodyparser = require('koa-bodyparser')
    ,json = require('koa-json')
    ,logger = require('koa-logger')
    ,auth = require('./server/routes/auth')
    ,errHandle = require('./server/routes/errorHandle')
    ,jwt = require('koa-jwt')
    ,api = require('./server/routes/api')
    ,xss = require('xss')
const app = new Koa()
    ,router = new koaRouter()

app.use(errHandle)

app.use(jwt({
    secret : 'secret'
}).unless({
    path:[/\/auth/]
}))
app.use(koaBodyparser())
app.use(json())
app.use(logger())



app.use(async function(ctx,next){
    let start = new Date()
    await next()
    let ms = new Date() - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

/* router.get("/user/:id",(ctx,next)=>{
    let id = ctx.params.id
    ctx.body = `<h1>hello , ${id}</h1>`
}) */
router.use('/auth',auth.router.routes())
router.use('/api',api.routes())

app.use(router.routes())

app.listen('8889',()=>{
    console.log('koa server is running at 8889')
})




