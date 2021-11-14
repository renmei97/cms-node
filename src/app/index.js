const Koa=require('koa')
const bodyparser=require('koa-bodyparser')
const errorHandler = require('./error.handle')
const useRoutes=require('../router/index')
const app=new Koa()
app.use(bodyparser())
useRoutes(app)
app.on('error',errorHandler)

module.exports=app
