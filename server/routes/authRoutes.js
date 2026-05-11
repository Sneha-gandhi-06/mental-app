const express =
  require("express");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const router =
  express.Router();

// SIGNUP ROUTE
router.post(
  "/signup",
  async (req, res) => {

    try {

      const {
        username,
        email,
        password,
        guardianContact
      } = req.body;

      // CHECK EXISTING USER
      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400)
          .json({
            message:
              "User already exists"
          });

      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER
      const newUser =
        new User({

          username,

          email,

          password:
            hashedPassword,

          guardianContact

        });

      await newUser.save();

      res.status(201)
        .json({

          message:
            "User registered successfully"

        });

    }

    catch (error) {

      res.status(500)
        .json({
          message:
            error.message
        });

    }

  }
);
// LOGIN ROUTE
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // FIND USER
      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(404)
          .json({
            message:
              "User not found"
          });

      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400)
          .json({
            message:
              "Invalid password"
          });

      }
// CREATE TOKEN
const token =
  jwt.sign(

    {
      id: user._id
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d"
    }

  );
      // SUCCESS LOGIN
      res.status(200)
  .json({

    token,

    message:
      "Login successful",

    user: {

      id: user._id,

      username:
        user.username,

      email:
        user.email

    }

  });

    }

    catch (error) {

      res.status(500)
        .json({
          message:
            error.message
        });

    }

  }
);
module.exports =
  router;