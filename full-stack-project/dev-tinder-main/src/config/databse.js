const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pankaj7559kumar:AOPRoJrHUnPdeSCK@cluster0.7a7zp.mongodb.net/devTinderealTimeproject?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDB;
