const express =
  require("express");

const Notification =
  require("../models/Notification");

const authMiddleware =
  require("../middleware/authMiddleware");

const router =
  express.Router();

// CREATE NOTIFICATION
router.post(

  "/create",

  authMiddleware,

  async (req, res) => {

    try {

      const {
        title,
        message
      } = req.body;

      const newNotification =
        new Notification({

          user:
            req.user.id,

          title,

          message

        });

      await newNotification.save();

      res.status(201)
        .json({

          message:
            "Notification created",

          notification:
            newNotification

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

// GET USER NOTIFICATIONS
router.get(

  "/my",

  authMiddleware,

  async (req, res) => {

    try {

      const notifications =
        await Notification.find({

          user:
            req.user.id

        }).sort({
          createdAt: -1
        });

      res.status(200)
        .json(
          notifications
        );

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