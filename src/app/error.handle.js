const errorType=require('../contants/error-type')
const errorHandler=(error,ctx)=>{
    let status,message
    switch(error.message){
        
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            console.log(error.message)
            status=400
            message='用户名或者密码为空'
            break
            case errorType.USER_ALREADY_EXISTS:
            console.log(error.message)
            status=409
            message='用户已经存在'
            break
            case errorType.USER_DOES_NOT_EXISTS:
                console.log(error.message)
                status=400
                message='用户不存在'
                break
                case errorType.PASSWORD_IS_INCORRENT:
                console.log(error.message)
                status=400
                message='密码不正确'
                break
                case errorType.UNAUTHORIZATION:
                console.log(error.message)
                status=400
                message='无效token'
                break
                case errorType.UNPERMISSION:
                    console.log(error.message)
                    status=401
                    message='您不具备操作权限'
                    break
            default:
                status:404
                message:"not found"
    }
    ctx.status=status
    ctx.body=message
 
}
module.exports=errorHandler