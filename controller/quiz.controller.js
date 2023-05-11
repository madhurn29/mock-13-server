const { QuizModel } = require("../model/data.model");

const postQuiz = async (req, res) => {
  let data = req.body;
  try {
    let quiz = await new QuizModel(data);
    await quiz.save();
    res.status(200).send({ message: "Quiz has been created successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getQuiz = async (req, res) => {
  try {
    let quiz = await QuizModel.find();
    res.status(200).send(quiz);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = { postQuiz, getQuiz };
