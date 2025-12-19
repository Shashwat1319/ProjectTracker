import express from "express"
import {signup,login,addProject, viewproject, dashboard,deleteProject, updateProject,addActivity,getActivities} from "../Controller/Controller.js";
import verifyToken from "../verifyToken.js";


const router = express.Router()
router.post("/signup",signup);
router.post("/login",login)
router.post("/projects",verifyToken,addProject)
router.get("/dashboard",verifyToken,dashboard)
router.get("/projects",verifyToken,viewproject)
router.delete("/projects/:id",verifyToken,deleteProject)
router.put("/projects/:id",verifyToken,updateProject)
router.post("/projects/:id/logs",verifyToken,addActivity)
router.get("/projects/:id/logs",verifyToken,getActivities)

export default router