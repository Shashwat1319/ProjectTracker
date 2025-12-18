import express from "express"
import {signup,login,addProject, viewproject, dashboard,deleteProject} from "../Controller/Controller.js";
import verifyToken from "../verifyToken.js";


const router = express.Router()
router.post("/api/signup",signup);
router.post("/api/login",login)
router.post("/api/projects",verifyToken,addProject)
router.get("/api/dashboard",verifyToken,dashboard)
router.get("/api/projects",verifyToken,viewproject)
router.delete("/api/projects/:id",verifyToken,deleteProject)