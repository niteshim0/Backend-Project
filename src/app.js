import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//express configuration and middleware settings
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true,
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))//for those assets which we want to keep on our own server and they must be publically available
app.use(cookieParser())

//read about all of them separately it will be fun


export {app};