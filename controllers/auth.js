const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const CustomError = require("../errors/CustomError");

const createuser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new CustomError(
        400,
        false,
        "You have already singned up. Please Login"
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    const payload = {
      id: user.id,
    };
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.status(200).json({ success: true, authToken: authToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ result: result.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(400, false, "Please Signup first");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new CustomError(400, false, "Password Incorrect");
    }
    const payload = {
      id: user.id,
    };
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "86000" });
    res.status(200).json({ success: true, authToken: authToken });
  } catch (error) {
    next(error);
  }
};

const getuser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email } = await User.findById(userId).select("-password");
    res.status(200).json({ success: true, user: { name: name, email: email } });
  } catch (error) {
    next(error);
  }
};

module.exports = { createuser, login, getuser };
