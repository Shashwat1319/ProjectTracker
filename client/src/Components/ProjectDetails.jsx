import axios from "axios";
import { useLocation, useParams, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
const ProjectDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

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

  return (
    <div className="card shadow-lg border-0">
      <div className="card-body p-4">

        <h2 className="text-center fw-bold mb-4">Project Details</h2>

        <div className="row g-3">
          <Detail label="Client" value={state.Client} />
          <Detail label="Project" value={state.Project} />
          <Detail label="Status" value={state.Status} badge />
          <Detail label="Budget" value={`₹ ${state.Budget}`} />
          <Detail label="Due Date" value={state.DueDate} />
          <div className="row">
            <div className="col-3"><div className="btn btn-success p-3 mt-4 w-100">Update</div></div>
            <div className="col-3"></div>
            <div className="col-3"></div>
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
