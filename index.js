const express = require("express");
require("dotenv").config();
var cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./route/user.route");
const { quizRouter } = require("./route/quiz.route");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/quiz", quizRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err, "connecting to db...");
  }
  console.log("server running on" + "" + process.env.port);
});
