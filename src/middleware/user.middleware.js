const errorType=require('../contants/error-type')
const userService=require('../service/user.service')
const md5password=require('../utils/password-handle')
const  verifyUser=async(ctx,next)=>{
    const {name,password}=ctx.request.body
    if(!name||!password)
    {
    const error=new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx)
     }
     const result=await userService.getUserByName(name)
     if(result.length){
         const error=new Error(errorType.USER_ALREADY_EXISTS)
         return ctx.app.emit('error',error,ctx)
     }  

     await next()
}
const handlePassword=async(ctx,next)=>{
    let {password}=ctx.request.body
    ctx.request.body.password=md5password(password)
    await next()

    
}
module.exports={verifyUser,handlePassword}