import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const ViewProject = () => {
  const [allProject, setAllProject] = useState([]);
  const [search, setSearch] = useState("");
  const [StatusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
        setAllProject(response.data.data);
      } catch (err) {
            if(err.response.data && err.response ){
              Swal.fire({
                
              })
            }
      }
    };
    fetchdata();
  }, []);

  const filteredProjects = allProject.filter((item) => {
    const matchedProject =
      item.Client.toLowerCase().includes(search.toLowerCase()) ||
      item.Project.toLowerCase().includes(search.toLowerCase());
    const matchedStatus =
      StatusFilter === "All" || item.Status === StatusFilter;
    return matchedProject && matchedStatus;
  });
  return (
    <>
      <div className="row w-50 mx-auto">
        <div className="col-6">
          <input
            type="text"
            className=" mx-auto mt-2 form-control"
            placeholder="Search by Client and Project Name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="col-6">
          <select
            className="mx-auto mt-2 form-select "
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
            value={StatusFilter}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Planned">Planned</option>
            <option value="In_Progress">In_Progress</option>
          </select>
        </div>
      </div>

      <table className="table mt-3 border w-50 mx-auto">
        <thead>
          <tr className="text-center">
            <th scope="col">S.No</th>
            <th scope="col">Client </th>
            <th scope="col">Project</th>
            <th scope="col">Status</th>
            <th scope="col">Budget</th>
            <th scope="col">Due Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody >
          {filteredProjects.length >0 ? (filteredProjects.map((item, index) => {
            return (
              <tr key={index} className="w-50 " >
                <td scope="row" >{index + 1}</td>
                <td>{item.Client}</td>
                <td>{item.Project}</td>
                <td
                  className={`${
                    ((item.Status == "Completed") ? "text-success" : "text-primary") ||  ((item.Status == "Planned") ? "text-secondary" : "text-primary")
                  }`}
                >
                  {item.Status}
                </td>
                <td>{item.Budget}</td>
                <td>{item.DueDate}</td>
                <td> <button className=" btn btn-success" onClick={()=>{navigate(`/pages/dashboard/projectdetails/${item._id}`,{state:item})}}>View</button></td> 
              </tr>
            );
          })): <td colSpan={7} className="text-center fst-italic"><h2>No Projects Found!!</h2></td>  }
        </tbody>
      </table>
    </>
  );
};

export default ViewProject;
