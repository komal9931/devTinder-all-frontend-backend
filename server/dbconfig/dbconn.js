// mongodb+srv://pankaj1234kashyap:WeLDWz0yGqJlqbIP@cluster0.7b7k1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require("mongoose");

const path = process.env.MONGODB_URL;
// console.log(path);
// const url='mongodb+srv://pankaj1234kashyap:WeLDWz0yGqJlqbIP@cluster0.7b7k1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDb = async () => {
  await mongoose.connect(path);
};

module.exports = connectDb;
