const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/devTinderfelix");
};

module.exports = connectDB;
