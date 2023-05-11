const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const saltRounds = 4;
var jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  let { email, pass } = req.body;

  if (email && pass) {
    let existing = await UserModel.findOne({ email });

    if (existing) {
      res.status(201).send({ message: "Already registered in, Please log in" });
    } else {
      try {
        bcrypt.hash(pass, saltRounds, async (err, hash) => {
          // Store hash in your password DB.
          try {
            let user = await new UserModel({ email, pass: hash });
            await user.save();
            res
              .status(200)
              .send({ message: "User has been Registered successfully" });
          } catch (error) {
            res.status(400).send({ message: error.message });
          }
        });
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    }
  } else {
    req.status(400).send({ message: "Enter all details" });
  }
};

const login = async (req, res) => {
  let { email, pass } = req.body;

  if (email && pass) {
    let user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(pass, user.pass, async (err, result) => {
        if (err) res.status(400).send({ message: err.message });
        else if (result) {
          res.status(200).send({
            message: "Logged in successfully",
            token: jwt.sign({ UserId: user._id }, "mock-13"),
          });
        } else {
          res.status(400).send({ message: "Invalid password" });
        }
      });
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } else {
    res
      .status(400)
      .send({ message: "Please enter a valid email and password." });
  }
};

module.exports = { signup, login };
