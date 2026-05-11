const express =
  require("express");

const Chat =
  require("../models/Chat");

const authMiddleware =
  require("../middleware/authMiddleware");

const router =
  express.Router();

// SAVE CHAT MESSAGE
router.post(

  "/save",

  authMiddleware,

  async (req, res) => {

    try {

      const {
        sender,
        message
      } = req.body;

      const newMessage =
        new Chat({

          user:
            req.user.id,

          sender,

          message

        });

      await newMessage.save();

      res.status(201)
        .json({

          message:
            "Chat saved",

          chat:
            newMessage

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

// GET CHAT HISTORY
router.get(

  "/history",

  authMiddleware,

  async (req, res) => {

    try {

      const chats =
        await Chat.find({

          user:
            req.user.id

        }).sort({
          createdAt: 1
        });

      res.status(200)
        .json(chats);

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