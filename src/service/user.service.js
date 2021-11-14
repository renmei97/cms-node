const connection=require('../app/database')
class UserService{
    async create(user){
        const {name,password}=user
        console.log(user)
        const statement=`INSERT into user(name,password)VALUES(?,?);`
       const result=await connection.execute(statement,[name,password])
        console.log(user)
        return result[0]
    }
    async getUserByName(name){
        const statement=`select * from user where name=?`
        const result=await connection.execute(statement,[name])
        return result[0]
    }

}
module.exports=new UserService()