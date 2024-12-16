const express=require("express");
const app=express();
const connectDB=require("./config/databse");
const { model } = require("mongoose");
const cookieParser = require('cookie-parser')
const cors=require("cors");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());  //middleware to read  json data provided by express js
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/userRequest");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB().then(()=>{
    console.log("DB is connected successfully");   
    app.listen(3000,()=>{
    console.log("Server is started at port number 3000");
    
})
})
.catch((err)=>{
    console.log("DB is not connected successfully");
    
})
