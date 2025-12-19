import React from "react";   // 🔴 THIS IS REQUIRED

import { useEffect } from 'react'
import { Outlet,useNavigate } from 'react-router-dom';

const Dashboared = () => {
    const token = localStorage.getItem('token');
    
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchdata =async()=>{
            try{
                const response = await axios.get("https://projecttracker-zke1.onrender.com/dashboard",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response.data)
            }catch{

            }
        }
        fetchdata()
    },[])
  return (
    <>
   <div className="container-fluid">
  <div className="row">
    <div className="col-2 sidebar">
      <div className="menu-item" onClick={()=>{navigate("/pages/dashboard/viewproject")}}>Projects</div>
      <div className="menu-item" onClick={()=>{navigate("/pages/dashboard/createproject")}}>Create Projects</div>
    </div>

    <div className="col-10 p-4">
      <Outlet/>
    </div>
  </div>
</div>

    </>
  )
}

export default Dashboared