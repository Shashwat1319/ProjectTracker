import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModal = mongoose.model("users", userSchema);

const addProjectSchema = new mongoose.Schema({
  userid:{
          type:mongoose.Schema.ObjectId,
          ref:"users",
          required:true
      },
  Client:{
    type:String,
    required:true,
  },
  Project:{
    type:String,
    required:true
  },
  Status:{
    type:String,
    required:true
  },
  Budget:{
    type:Number
  },
  DueDate :{
    type:String,
    required:true 
  },
})

const addProjectModal = mongoose.model("projects",addProjectSchema)



const ActivityLogsSchema= new mongoose.Schema({
      ProjectId:{
          type:mongoose.Schema.ObjectId,
          ref:"projects",
          required:true
      },
      message:{
        type:String,
        required:true
      }
})

const ActivityLogsModal = mongoose.model("Logs",ActivityLogsSchema)
export  {userModal,addProjectModal,ActivityLogsModal}