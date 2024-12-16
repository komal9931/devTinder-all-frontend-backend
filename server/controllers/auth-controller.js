const bcrypt = require("bcrypt");
const authuser = require("../models/auth-schema");

const Home = async (req, res) => {
  res.send("Welcome to my home page!");
};

// registeration logic

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExit = await authuser.findOne({ email });

    if (userExit) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const data = await authuser.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      // msg:data,
      msg: "registration successful",
      token: await data.generateToken(),
      userId: data._id.toString(),
    });
  } catch (error) {
    res.status(404).json("Internal Server Error");
  }
  // res.send("welcome to register");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authuser.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = await user.generateToken(); // Ensure token is generated here
      res.json({
        msg: "Login successful",
        token: token, // Make sure to use the variable
        userId: user._id.toString(),
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json("Internal Server");
  }
};

// login logic

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await authuser.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = await user.generateToken(); // Ensure token is generated here
//       res.json({
//         msg: "Login successful",
//         token: token, // Make sure to use the variable
//         userId: user._id.toString(),
//       });
//     } else {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json("Internal Server Error");
//   }
// };

module.exports = { Home, register, login };
