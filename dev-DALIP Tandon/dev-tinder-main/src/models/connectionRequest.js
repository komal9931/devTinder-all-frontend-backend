const mongoose=require("mongoose");
const User=require("../models/user");
const connectionSchema=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User" //reference to the user collection , just like joints in sql
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{value} is incorrect status type`,
        }
    }
},{timestamps:true});


 connectionSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("invalid user connection");
    }
    next();
 })

const ConnectionModel=new mongoose.model("ConnectionModel",connectionSchema);


module.exports=ConnectionModel;