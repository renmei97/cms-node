const errorType=require('../contants/error-type')
const userService=require('../service/user.service')
const jwt=require('jsonwebtoken')
const {KEY}=require('../app/config')

const md5password=require('../utils/password-handle')
const authService = require('../service/auth.service')
const verifyLogin=async(ctx,next)=>{
 const {name,password}=ctx.request.body
 if(!name||!password)
    {
    const error=new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx)
     }
     const result=await userService.getUserByName(name)
     const user=result[0]
     if(!user){
         const error=new Error(errorType.USER_DOES_NOT_EXISTS)
         return ctx.app.emit('error',error,ctx)
     } 
     if(md5password(password)!==user.password){
         const error=new Error(errorType.PASSWORD_IS_INCORRENT)
         return ctx.app.emit('error',error,ctx)
     }
     ctx.user=user
     await next() 

}
const verifyAuth=async(ctx,next)=>{
    console.log('验证授权的middleware')
    const authorization=ctx.headers.authorization
    if(!authorization){
        const error=new Error(errorType.UNPERMISSION)
       return  ctx.app.emit('error',error,ctx)
          
    }
    const token=authorization.replace('Bearer ','')
    try{
        const result=jwt.verify(token,KEY)
        ctx.user=result
        await next()
    }catch(err){
        const error=new Error(errorType.UNAUTHORIZATION);
        ctx.app.emit('error',error,ctx)
    }
   
    


}
const verifyPermission = async (ctx, next) => {
    console.log("验证权限的middleware~");
  
    // 1.获取参数 { commentId: '1' }
    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id', '');
    const resourceId = ctx.params[resourceKey];
    const { id } = ctx.user;
   
  
    // 2.查询是否具备权限
    try {
      const isPermission = await authService.checkResource(tableName, resourceId, id);
  
      if (!isPermission) throw new Error(); 
      console.log(isPermission)
      await next();
    } catch (err) {
      console.log(8)
      const error = new Error(errorTypes.UNPERMISSION);
      return ctx.app.emit('error', error, ctx);
    }
  }
    
    

      

module.exports={verifyLogin,verifyAuth,verifyPermission}