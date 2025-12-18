import {userModal,addProjectModal} from "../DbModal/DbModal.js";
import bcrypt from "bcryptjs";
import jwt from"jsonwebtoken"


const signup =async (req, res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status:400,
                msg:"Email and password are required!!",
                success:false
            })
        }

        const isEmail = await userModal.findOne({email})
        if(isEmail){
            return res.json({
                status:409,
                msg:"Email already Exists",
                success:false
            })
        }
        
        
        const hashpassword = await bcrypt.hash(password,10)

        const data = await userModal.create({
            email:email,
            password:hashpassword
        })
         res.json({
                status:201,
                msg:"Signup Successfully!!",
                data:{
                    email:data.email
                },
                success:true
            })
        
    }catch(err){
       return res.status(500).json({
        success:false,
        msg:"Internal Server Error"
       })
    }
}


const login = async(req,res)=>{
    try{
        
    const {email,password} = req.body

     if(!email || !password){
            return res.status(400).json({
                status:400,
                msg:"Email and password are required!!",
                success:false
            })
        }


    const user = await userModal.findOne({email})
    // User Existence
    if(!user){
        return res.status(404).json({
            msg:"User not Found",
            success:false
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    // Password Matching
    if(!isMatch){
            return res.status(401).json({
            msg:"Invalid email and password",
            success:false
        })
    }
    const token = jwt.sign({email},process.env.SECRET_KEY,{expiresIn:"30s"})
    return res.status(200).json({
        msg:"Login Succesfully",
        userId:user._id,
        success:true,
        token
    })
    }catch(err){
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

const addProject=async(req,res)=>{
    try{
        const {clientName,projectName,budget,status,dueDate} = req.body;
        if(!clientName || !projectName || !budget || !status || !dueDate){
            return res.status(400).json({
                msg:"All Fields Are Required !!",
                success:false
            })
        }
        const data = await addProjectModal.create({
            userid:req.user._id,
            Client:clientName,
            Project:projectName,
            Status:status,
            Budget:budget,
            DueDate:dueDate
        })
        res.status(200).json({
            msg:"Successfully Add Project",
            success:true,
            data
        })
    }catch(err){
            res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

const dashboard = async(req,res)=>{
    try{
      res.status(200).json({
        success:true,
        msg:"Welcome to Dashboard",
        user:{
          id:req.user._id,
          email:req.user.email
        }
      })
    }catch(err){
      res.status(500).json({
        success:false,
        msg:"Server Error"
      })
    }
}




const viewproject =async(req,res)=>{
        try{
            const data = await addProjectModal.find({userid:req.user._id});
            const user =req.user.email
            res.status(200).json({
                msg:"All Project Lists",
                data,
                username:user.split("@")[0]
            })
        }catch(err){
            res.status(500).json({
        success:false,
        msg:"Server Error"
      })
        }
}

export  {signup,login,addProject,viewproject,dashboard}