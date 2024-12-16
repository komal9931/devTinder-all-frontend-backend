const express=require("express");
const profileRouter=express.Router();
const{userAuthentication}=require("../middlewares/authentication");
const User=require("../models/user");
const {validateProfileEdit,validatePassword} =require("../utils/validation")
const bcrypt = require('bcrypt'); // password encryption
profileRouter.get("/profile/view",userAuthentication,async (req,res)=>{
    try{
    const user=req.user;
    
    res.send(user);
    
    }catch(error){
        res.status(400).send("ERROR :"+error.message);
    }
})

profileRouter.patch("/profile/edit",userAuthentication, async(req,res)=>{
    try{
        if(!validateProfileEdit(req)){
            throw new Error(" Can't update this field");
        }

        const LoggedInuser=req.user;
        Object.keys(req.body).every((key)=>
           ( LoggedInuser[key]=req.body[key])
        )
        // console.log(LoggedInuser);
     await LoggedInuser.save();
        res.json({message :` ${LoggedInuser.firstName} , your profile updated successfully`,
            data:LoggedInuser
        }
        );
    }catch(error){
        res.status(400).send("Error :"+error.message);
    }
})


profileRouter.patch("/profile/password",userAuthentication,async(req,res)=>{
    const{password,newPassword}=req.body;
    try{
        if(!validatePassword(req)){
            throw new Error("Invalid password");
        }
    const userData=req.user;
   const checkPasword=await bcrypt.compare(password,userData.password);
        if(!checkPasword){
           throw new Error("Invalid password");
        }
        const hashedPasword=await bcrypt.hash(newPassword,10);
        await User.updateOne({_id:userData.id},{password:hashedPasword});
        res.send("password changed successfully");
    }catch(error){
        res.status(400).send("Error :"+ error.message);
    }
})

module.exports=profileRouter;