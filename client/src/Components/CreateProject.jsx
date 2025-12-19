import React from "react";   // 🔴 THIS IS REQUIRED

import axios from "axios"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import Swal from "sweetalert2"

const CreateProject = () => {
    const [clientName,SetClientName] = useState("")
    const [projectName,SetProjectName] = useState("")
    const [budget,Setbudget] = useState(0)
    const [status,SetStatus] = useState("")
    const [dueDate,setDueDate] = useState("")
    const token = localStorage.getItem('token');
    const [tokenExpire,setTokenexpire] = useState("")
    if(tokenExpire==true){
        <Navigate to={"/login"} replace />
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post("https://projecttracker-zke1.onrender.com/api/projects",{
                clientName,
                projectName,
                budget,
                status,
                dueDate
            },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
            if(response.status == 200){
                Swal.fire({
                    title:"Project Created",
                    text:response.data.msg,
                    icon:"success"
                })
                SetClientName("")
                SetProjectName("")
                SetStatus("")
                Setbudget("")
                setDueDate("")
            }
        } catch (error) {
            if(error.response.status == 403){
               setTokenexpire(true)
            }
        }
    }
  return (
    <>

    
    <div className="row">
        <div className="col-3"></div>
        <div className="col-6 CPro mt-5 ">
            <h1 className='text-center mt-4'>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Client Name' required className='form-control mt-3' onChange={(e)=>{SetClientName(e.target.value)}} value={clientName} />
                <input type="text" placeholder='Project Name' required className='form-control mt-3'onChange={(e)=>{SetProjectName(e.target.value)}} value={projectName}/>
                <select className='form-select mt-3' onChange={(e)=>{SetStatus(e.target.value)}} value={status} required>
                    <option value=""  disabled> Select Status</option>
                    <option value="Planned">Planned</option>
                    <option value="In_Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input type="number" placeholder='Budget' onChange={(e)=>{Setbudget(e.target.value)}} value={budget} required className='form-control mt-3' />
                <input type="date" placeholder='Due Date' onChange={(e)=>{setDueDate(e.target.value)}} value={dueDate} required className='form-control mt-3' />
                <input type="submit" value="Create Project" className='form-control mt-3 mb-3 btn btn-success' />
            </form>
        </div>
        <div className="col-3"></div>
    </div>
    </>
  )
}

export default CreateProject