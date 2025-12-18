import express from "express";
import cors from "cors";
import {signup,login,addProject, viewproject, dashboard} from "./Routes/Routes.js";

import connectDB from "./DbConfig/Dbconfig.js"
import verifyToken from "./verifyToken.js";
import "dotenv/config";


const app = express();

app.use(cors());

app.use(express.json());

connectDB()



app.post("/api/signup", signup);
app.post("/api/login",login)
app.post("/api/projects",verifyToken,addProject)
app.get("/api/dashboard",verifyToken,dashboard)
app.get("/api/projects",verifyToken,viewproject)


app.listen(process.env.PORT, () => {
  console.log(`Server is running at port : ${process.env.PORT}`);
});
