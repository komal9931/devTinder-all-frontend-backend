const express=require("express");
const requestRouter=express.Router();
const{userAuthentication}=require("../middlewares/authentication");
const User=require("../models/user");
const connectionRequest=require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId",userAuthentication,async(req,res)=>{
   try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const allowed=["interested","rejected"];
    if(!allowed.includes(status)){
        return res.status(400).send({
            message:"Invalid status",
        });
    }
    const user=await User.findById(toUserId);
    if(!user){
        return res.status(400).send({
            message:"Invalid user connection",
        })
    }
    const exisitingUser=await connectionRequest.findOne({
        $or:[
            {toUserId,fromUserId},
            {fromUserId:toUserId,toUserId:fromUserId},
        ]
    })
        if(exisitingUser){
      return res.status(400).send({
        message:"Invalid request",
     })
        }

    const connection=new connectionRequest({
        fromUserId,toUserId,status,
    });
    const data=await connection.save();

    res.json({
        message:"your connection is estalished",
        data
    });




   }catch(error){
    res.status(400).json({message:"something went wrong :"+ error.message});
   }
})

requestRouter.post("/request/receive/:status/:requestId",userAuthentication,async(req,res)=>{

try{

    const loggedInUser=req.user;
    const{status,requestId}=req.params;

    const isAllowed=["accepted","rejected"];
    if(!isAllowed.includes(status)){
        return res.status(404).json({
            message:"Invalid status type "
        })
    }

    const request=await connectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser,
        status:"interested"
    })

    if(!request){
       return res.status(404).json({
            message:"connection request not found"
        })
    }

    request.status=status;

    const data=await request.save();

   res.json({
    message:"connection request "+status ,
    data
   })
}catch(error){
    res.status(404).json({
        message:"Error :"+error.message
    })
}
})

module.exports=requestRouter;