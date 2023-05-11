const express = require("express");
const {
  postQuiz,
  getQuiz,
  getQuizbyID,
} = require("../controller/quiz.controller");
const { Auth } = require("../middleware/auth.middleware");

const quizRouter = express.Router();

quizRouter.get("/", getQuiz);
quizRouter.get("/:id", getQuizbyID);
quizRouter.use(Auth);
quizRouter.post("/", postQuiz);

module.exports = { quizRouter };
