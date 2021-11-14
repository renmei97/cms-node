const connection=require('../app/database')
const { update } = require('../controller/moment.controller')
class MomentService{
 async create(userId,content){
     const statement=`insert into moment (content,user_id) values(?,?)`
     const [result]=await connection.execute(statement,[content,userId])
     return result
 }
 async getMomentById(id){
    const statement=`select * from  moment where id=?`
    const [result]=await connection.execute(statement,[id])
    return result[0]
 }
 async getMomentList(offest,size){
     const statement=`select * ,(select count(*) from comment where comment.moment_id=moment.id) as commentcount ,(select count(*) from moment_label ml where ml.moment_id=moment.id) labelcount from  moment limit ?,? `
     const [result]=await connection.execute(statement,[offest,size])
     return result

 }
 async update(content,momentId){
    const statement=`update moment set content=? where id=?`
  const [result]=await connection.execute(statement,[content,momentId])
  return result
}
async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  async hasLabel(momentId,labelId){
    const statement=`select * from moment_label where moment_id=? and label_id=?`
    const [result]=await connection.execute(statement,[momentId,labelId])
    return result[0]?true:false
    }
    async addLabel(momentId,labelId){
      const statement=`insert into moment_label(moment_id,label_id) values(?,?)`
      const [result]=connection.execute(statement,[momentId,labelId])
      return result
    }
}
module.exports=new MomentService()
