const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Iamthegoat";

const createuser = async (req, res) => {
  // if there are errors in sign up credentials throw error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  // check whether a user with the same email exists already
  let user = await User.findOne({ email: req.body.email });
  // if the user exists then return error
  if (user) {
    return res.status(400).json({
      success: false,
      error: "Sorry! A user with this email alreasy exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  // create a document containing user details
  try {
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    res.status(200).json({ success: true, authToken: authToken });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const login =async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ result: result.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "Please try to login with proper credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success: false,
          msg: "Please try to login with proper credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

const getuser =async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.status(200).send({ success: true, user: user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

module.exports={createuser,login,getuser}