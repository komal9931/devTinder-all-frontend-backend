const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://pankaj1234kashyap:kIorqgK0kSPHm5gq@cluster0.pukbs.mongodb.net/abckidher?retryWrites=true&w=majority&appName=Cluster0"
  );
};
// const connectDb = async()=>{
//     await mongoose.connect("mongodb+srv://swapnasruthi2005:cJqHf7r9i7KbhlXd@namastnode.ly0hp.mongodb.net/devTinder");
// }
module.exports = connectDb;
