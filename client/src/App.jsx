import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js"

import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'
import Home from './Components/Home'
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import Dashboared from './Components/Dashboared'
import Protected from './Components/Protected'
import Navbar from './Components/Navbar'
import CreateProject from './Components/CreateProject'
import ViewProject from './Components/ViewProject'
import ProjectDetails from './Components/ProjectDetails'
import Public from './Components/Public'


function App() {
  function removeExpiredToken() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const isExpired = payload.exp * 1000 < Date.now();

  if (isExpired) {
    localStorage.removeItem("token");
  }
}

removeExpiredToken();

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/signup' element={<Public><Signup/></Public>}/>
        <Route path='/login' element={<Public><Login/></Public>}/>
         <Route
          path="/pages/dashboard"
          element={
            <Protected>
              <Dashboared />
            </Protected>
          }
        >

          <Route index element={<Navigate to="viewproject" />} />

          <Route path="createproject" element={<CreateProject />} />
          <Route path="viewproject" element={<ViewProject />} />
          <Route path="projectdetails/:id" element={<ProjectDetails />} />
        </Route>
          
        <Route path='*' element="Page not found"/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
