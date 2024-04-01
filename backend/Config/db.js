const mongoose=require("mongoose");
const {DB_Name}=require("../constant.js");

const connectDB=async ()=>{
        try{
            const conn=await mongoose.connect(`${process.env.MONGO_URL}/${DB_Name}`) ;
            console.log(`MongoDB is connected : ${conn.connection.host}`);
        }catch(err){
            console.log(`Error : ${err.message}`);
            process.exit();
        }
}

module.exports=connectDB;