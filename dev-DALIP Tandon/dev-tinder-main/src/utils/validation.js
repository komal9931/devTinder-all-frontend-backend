const validator=require("validator");

const signupValidation=(req)=>{

const{firstName,lastName,emailId,password}=req.body;
if(!firstName || !lastName){
    throw new Error("name is not valid ");
}else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid");
}else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter strong password");
}

}

const validateProfileEdit=(req)=>{
    const IsAllowed=["firstName","lastName","age","skills","about","gender","profilUrl"];
    const isEditFiled=Object.keys(req.body).every((key=>IsAllowed.includes(key)));

    return isEditFiled;
}

const validatePassword=(req)=>{
    const{password,newPassword}=req.body;
    if(!password || !newPassword){
        throw new Error("Please enter both fields")
    }
    return true;
}

module.exports={
    signupValidation,
    validateProfileEdit,
    validatePassword
}