const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pankaj7559kumar:TrSkrTW5Wq2b2Zbw@cluster0.yzoyy.mongodb.net/authentication?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDB;
