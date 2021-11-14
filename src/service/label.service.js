const connection=require('../app/database')
class LabelService{
  async create(name){
const statement=`insert into label (name) values (?)`

const [result]=await connection.execute(statement,[name])
console.log(result)
console.log(name,result)
return result
  }
  async getLabelByName(name){
      const statement=`select * from label where name=?`
      const [result]=await connection.execute(statement,[name])
      return result[0]
  }
  async getLabels(limit,offest){
    const statement=`select * from label limit ?,?`
    const [result]=await connection.execute(statement,[offest,limit])
   console.log(result)
    return result
  }
}
module.exports=new LabelService()