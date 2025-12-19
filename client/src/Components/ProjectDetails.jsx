import React from "react";   // 🔴 THIS IS REQUIRED

import axios from "axios";
import { useLocation, useParams, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const ProjectDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    const [activity,setActivity] = useState("")

const [form, setForm] = useState({
  Client: state.Client,
  Project: state.Project,
  Status: state.Status,
  Budget: state.Budget,
  DueDate: state.DueDate
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

  if (!state) {
    return (
      <div className="text-center mt-5">
        <h4>Project data not found</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }



  const DeleteProject =()=>{
        Swal.fire({
          title:"Delete Project",
          text:"Are You Sure you want to delete this project",
          icon:"warning",
          showCancelButton:true,
          showConfirmButton:true,
          confirmButtonText:"Delete",
          confirmButtonColor:"red"
        }).then(async(result)=>{
          if(result.isConfirmed){
            try{
             const response =  await axios.delete(`https://projecttracker-zke1.onrender.com/api/projects/${id}`,{
                headers:{
                  Authorization: `Bearer ${token}`
                }
              })
              console.log(response)
              Swal.fire({
                title:"Deleted!",
                text:"Project remove Successfully!!",
                icon:"success"
              })
              navigate("/pages/dashboard/viewproject")
            }catch(err){
              Swal.fire({
                title:"Error",
                text:err.response.data.msg,
                icon:"error"
              })
          }
          }
        })
  }
const UpdateProject = async () => {
  try {
    const response = await axios.put(
      `https://projecttracker-zke1.onrender.com/api/projects/${id}`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
    Swal.fire("Updated!", "Project updated successfully.", "success");
    navigate("/pages/dashboard/viewproject");
  } catch (err) {
    Swal.fire(
      "Error",
      err.response?.data?.msg || "Failed to update project",
      "error"
    );
  }
};

const AddActivity=async()=>{
  try{
    const response = await axios.post(`https://projecttracker-zke1.onrender.com/api/projects/${id}/logs`,{activity}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    
  })
  console.log(response.data)
  }catch(err){
    Swal.fire({
      title:"Error",
      text:"Internal Server error",
      icon:"error"
    })
  }
}



  return (
    <>
    <div className="card shadow-lg border-0">
      <div className="card-body p-4">

        <h2 className="text-center fw-bold mb-4">Project Details</h2>

        <div className="row g-3">
          <Detail label="Client" value={
  <input
    className="form-control"
    name="Client"
    value={form.Client}
    onChange={handleChange}
  />
} />
<Detail label="Project" value={
  <input
    className="form-control"
    name="Project"
    value={form.Project}
    onChange={handleChange}
  />
} />
<Detail label="Status" value={
  <input
    className="form-control"
    name="Status"
    value={form.Status}
    onChange={handleChange}
  />
} />
<Detail label="Budget" value={
  <input
    className="form-control"
    name="Budget"
    value={form.Budget}
    onChange={handleChange}
  />
} />
<Detail label="Due Date" value={
  <input
    className="form-control"
    name="DueDate"
    value={form.DueDate}
    onChange={handleChange}
  />
} />

          <div className="row">
            <div className="col-3"><div className="btn btn-success p-3 mt-4 w-100" onClick={UpdateProject}>Update</div></div>
            <div className="col-5"><h1 className="text-center mt-4">Activity Log</h1></div>
            <div className="col-1"></div>
            <div className="col-3"><div className="btn btn-danger p-3 mt-4 w-100" onClick={DeleteProject}>Delete</div></div>
          </div>
          
        </div>

        <hr className="my-4" />
   
        <div className="text-end">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
    <hr />
    <h1 className="text-center">Activity Log</h1>
    <hr />
    <div className="row">
        <div className="col-sm-9">
            <input type="text" className="form-control" placeholder="Enter New Activity" onChange={(e)=>setActivity(e.target.value)} value={activity}/>
        </div>
        <div className="col-sm-3">
          <button className="btn btn-success" onClick={AddActivity}>Add New Activity</button>
        </div>
    </div>
    </>
    );
};

/* Reusable row component */
const Detail = ({ label, value, badge }) => {
  return (
    <div className="col-md-6">
      <div className="d-flex justify-content-between align-items-center p-3 border rounded">
        <span className="fw-semibold text-muted">{label}</span>
        {badge ? (
          <span className="badge bg-success fs-6">{value}</span>
        ) : (
          <span className="fw-bold">{value}</span>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
