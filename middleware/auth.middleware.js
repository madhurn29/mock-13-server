var jwt = require("jsonwebtoken");
const Auth = async (req, res, next) => {
  let token = req.headers.authorization;
  let data = req.body;

  if (token) {
    try {
      var decoded = jwt.verify(token, "mock-13");
      console.log(decoded);
      data.creatorID = decoded.UserId;
      next();
    } catch (err) {
      // err
      res
        .status(400)
        .send({ message: "You are not authorized to do this action" });
    }
  } else {
    res.status(400).send({ message: "Authorization is required" });
  }
};

module.exports = { Auth };
