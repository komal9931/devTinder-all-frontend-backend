const express=require("express");
const userRouter=express.Router();
const{userAuthentication}=require("../middlewares/authentication");
const connectionRequest=require("../models/connectionRequest");
const User =require("../models/user")


const SECRET_DATA="firstName lastName gender age skills about profilUrl"
userRouter.get("/user/request/received",userAuthentication,async(req,res)=>{
    try{

        const loggedInUser=req.user;
        const connectionRequests=await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",SECRET_DATA) //populate is used to find the extra data present in freomuserId ,that we created reference using ref in connectionRequest schema
            //either we can write it as ["firstName","lastName"] ie in array format or in about written format

        if (connectionRequests.length === 0) {
           throw new Error("No pending request found");
        }

        res.json({
            message:"Data fetched successfully",
            data:connectionRequests,
        })
    }catch(error){
        res.status(400).json({
            message:"Error :" + error.message
        })
    }
})

userRouter.get("/user/connections",userAuthentication,async(req,res)=>{
    try{

        const loggedInUser=req.user;

        const connectionRequests=await connectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",SECRET_DATA).populate("toUserId",SECRET_DATA);
            
        const  data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({data})
    }catch(error){
        res.status(400).json({
            message:"Error : "+error.message
        })
    }
})


userRouter.get("/user/feed",userAuthentication,async(req,res)=>{
    try{

        const loggedInUser=req.user;
        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;

        const connectionRequests=await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        const hideUserFromFeed=new Set();
        connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId);
            hideUserFromFeed.add(req.toUserId);
        })

        const users=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(SECRET_DATA).skip(skip).limit(limit);

        res.send(users);

    }catch(error){
        res.status(400).json({
            message:"ERROR: "+error.message
        })
    }
})

module.exports=userRouter;