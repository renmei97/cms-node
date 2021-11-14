const momentService=require('../service/moment.service')
class MomentController{
   async create(ctx,next){
      const userId=ctx.user.id
     
      const content=ctx.request.body.content
      console.log(userId,content)
      const result=await momentService.create(userId,content)
      ctx.body=result
   }
   async detail (ctx,next){
      const momentId=ctx.params.momentId
      const result=await momentService.getMomentById(momentId)
     ctx.body=result

   }
   async list(ctx,next){
      const {offest,size}=ctx.query
      const result=await momentService.getMomentList(offest,size)
      ctx.body=result
   }
   async update(ctx,next){
      const momentId=ctx.params.momentId
      const {content}=ctx.request.body
      const result= await momentService.update(content,momentId)
      ctx.body=result
   }
   async remove(ctx, next) {
      // 1.获取momentId
      const  momentId  = ctx.params.momentId;
  
      // 2.删除内容
      const result = await momentService.remove(momentId);
      ctx.body = result;
    }
    async addLabels(ctx,next){
       const {labels}=ctx
       const {momentId}=ctx.params
       
       for(let label of labels){
          const isExist=await momentService.hasLabel(momentId,label.id)
          console.log(isExist)
          if(!isExist){
             await momentService.addLabel(momentId,label.id)
          }
       }
       ctx.body='tag'
    }
  
}
module.exports=new MomentController()