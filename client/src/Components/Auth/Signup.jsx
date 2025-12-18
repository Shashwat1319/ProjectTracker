import React, { useState } from 'react'
import axios from "axios"
import Swal from "sweetalert2"
const Signup = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:8000/api/signup",{email,password})
            if(response.data.success == false){
                Swal.fire({
                title:"Signup Failed",
                text:response.data.msg,
                icon:"error",
            })
            }else{
                Swal.fire({
                title:"Signup Successfull",
                text:response.data.msg,
                icon:"success"
            })
            }  
        }catch(err){
            Swal.fire({
                title:"Error",
                text:err.message,
            })
        }

    }
  return (
    <>
    <div className="signup">
        <div className="row">
            <div className="col-4"></div>
            <div className="col-3 mt-5 border mb-5 mx-auto">
                <h1 className='text-center '>Signup</h1>
                <form onSubmit={handleSubmit}>
                <input type="email"  className='form-control mt-2' placeholder='Enter Email' required onChange={(e)=>setEmail(e.target.value)} value={email} />
                <input type="password" className='form-control mt-2'  placeholder='Enter Password' required  onChange={(e)=>setPassword(e.target.value)} value={password} />
                <input type="submit"  className='form-control btn btn-success mb-3 mt-3' value="Signup" />
        </form>
            </div>
            <div className="col-4"></div>
        </div>
        
    </div>
    </>
  )
}

export default Signup