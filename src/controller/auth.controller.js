const jwt=require('jsonwebtoken')
const {KEY}=require('../app/config')
class AuthController{
   
    async login(ctx,next){
        console.log(ctx.user)
        const {id,name}=ctx.user
        const token=jwt.sign({id,name},KEY,{
            expiresIn:60*60*24
        })
        
        ctx.body={id,name,token }

    }
    async success(ctx,next){
        ctx.body="auth success"
    }
}
module.exports=new AuthController