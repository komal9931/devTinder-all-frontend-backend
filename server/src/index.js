const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const router = require("../router/auth-router");
const connectDB = require("../dbconfig/dbconn");
const port = 7777;
const hostname = "127.0.0.1";
// middleware
app.use(express.json());

app.use("/api/auth", router);

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  });
