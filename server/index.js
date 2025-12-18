import express from "express";
import cors from "cors";
import connectDB from "./DbConfig/Dbconfig.js"
import router from "./Routes/Routes.js";
import "dotenv/config";


const app = express();

app.use(cors());

app.use(express.json());
app.use("/api",router)

connectDB()


app.listen(process.env.PORT, () => {
  console.log(`Server is running at port : ${process.env.PORT}`);
});
