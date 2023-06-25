const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const { createuser,login,getuser } = require("../controllers/auth");



// Route 1: create a user using : POST  "/api/auth/createuser"  Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 6,
    }),
  ],
  createuser
);

// Route 2: autenticate the user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  login
);

// Route 3: get logged in details : GET /api/auth/getuser Login required
router.post("/getuser", fetchuser, getuser);
module.exports = router;
