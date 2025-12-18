import express from "express";
import cors from "cors";
import connectDB from "./DbConfig/Dbconfig.js"

import "dotenv/config";


const app = express();

app.use(cors());

app.use(express.json());

connectDB()


app.listen(process.env.PORT, () => {
  console.log(`Server is running at port : ${process.env.PORT}`);
});
