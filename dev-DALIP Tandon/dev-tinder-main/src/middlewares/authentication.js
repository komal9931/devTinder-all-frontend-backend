const jwt =require("jsonwebtoken");
const User=require("../models/user");
const userAuthentication=async(req,res,next)=>{


  try{ const cookies=req.cookies;

    const{token}=cookies;
    if(!token){
        return res.status(401).send({
            message:"you are not logged in"
        });
    }
    const isToken=await jwt.verify(token,"DEVTinder@1234hds");
     
     const {_id}=isToken;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("user does't exist");
    }
    req.user=user;
    next();
}catch(error){
    res.status(400).send("ERROR :"+error.message);
}
}


module.exports={
userAuthentication,
}