const express = require("express");

const router = express.Router();
const { Home, register, login } = require("../controllers/auth-controller");
const validate = require("../validators/auth-validation");

router.get("/", Home);
router.post("/register", validate(), register);
router.post("/login", login);
module.exports = router;
