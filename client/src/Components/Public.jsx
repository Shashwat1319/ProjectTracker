import React from "react";
import { Navigate } from "react-router-dom"
const Public = ({children}) => {
    const token = localStorage.getItem("token")
    if(token){
       return <Navigate to={"/pages/dashboard"} replace/>
    }
    return children
}

export default Public