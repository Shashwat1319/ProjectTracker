import mongoose from "mongoose"
const connectDB =async()=>{
    try{
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("Database is Connected !!")
  
    }catch(err){
        console.log("Database is not cnnected",err)
    }
}

export default connectDB