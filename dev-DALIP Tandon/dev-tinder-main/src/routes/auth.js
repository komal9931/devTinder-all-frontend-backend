const bcrypt = require('bcrypt'); // password encryption
const User=require("../models/user");
const jwt = require('jsonwebtoken'); //for jwttokens
const validator=require("validator"); //npm library for validations
const {signupValidation}=require("../utils/validation");


const express=require("express");
const authRouter=express.Router();

authRouter.post("/signup",async(req,res)=>{
    // console.log(req.body); //req.body is used to read data send via api 
     try{
         signupValidation(req);
         const{firstName,lastName,emailId,password,age,skills,gender,profilUrl}=req.body;
         const hashPassword=await bcrypt.hash(password,10);
         const user=new User({
             firstName,lastName,emailId,password:hashPassword,age,//adding data via post api
         });
        const savedUser= await user.save();
         var token = await jwt.sign({ _id: user._id }, "DEVTinder@1234hds",{expiresIn:"7d"});
         res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
          });
      
          res.json({ message: "User Added successfully!", data: savedUser });
        } catch (err) {
          res.status(400).send("ERROR : " + err.message);
        }
 
 })
 
 
 authRouter.post("/login",async(req,res)=>{
     const{emailId,password}=req.body;
     try{
     if(!validator.isEmail(emailId)){
         throw new Error("invalid email");
     }
     const user=await User.findOne({emailId:emailId});
 
     if(!user){
         throw new Error("Invalid credentails");
     }
     const isPassword=await bcrypt.compare(password,user.password);
     if(isPassword){
         var token = await jwt.sign({ _id: user._id }, "DEVTinder@1234hds",{expiresIn:"7d"});
         res.cookie("token",token);
         res.json({
            message:"login successful",
            data:user
         })   
      }else{
         throw new Error("invalid credentails")
     }
     
 }catch(error){
     res.status(400).send("Error: "+error.message);
 }
 })

authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("logout successful");
})
 module.exports=authRouter;