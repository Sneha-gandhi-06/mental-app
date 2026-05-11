const express =
  require("express");

const User =
  require("../models/User");

const authMiddleware =
  require("../middleware/authMiddleware");

const router =
  express.Router();

// PROTECTED PROFILE ROUTE
router.get(
  "/profile",

  authMiddleware,

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.status(200)
        .json(user);

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