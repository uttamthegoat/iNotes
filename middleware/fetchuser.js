var jwt = require("jsonwebtoken");
const CustomError = require("../errors/CustomError");

const fetchuser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      throw new CustomError(401, false, "Please Login");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: data.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = fetchuser;
