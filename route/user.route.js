const express = require("express");
const { UserModel } = require("../model/user.model");
const { signup, login } = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

module.exports = { userRouter };
