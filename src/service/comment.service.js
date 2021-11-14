const connection=require('../app/database')
class CommentSrevice{
async create(momentId,content,userId){
    const statement=`insert into comment (content,moment_id,user_id) values(?,?,?)`
    const [result]= await connection.execute(statement,[content,momentId,userId])
    return result

}
async reply(momentId,content,userId,commentId){
    const statement=`insert into comment (content,moment_id,user_id,comment_id) values(?,?,?,?)`
    const [result]= await connection.execute(statement,[content,momentId,userId,commentId])
    return result

}
async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [content, commentId]);
   return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
  async getCommentsByMomentId(momentId){
      const statement=`select *from comment where moment_id=?`
      const [result]=await connection.execute(statement,[momentId])
      return result
  }
}
module.exports=new CommentSrevice()