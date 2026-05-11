const express =
  require("express");

const User =
  require("../models/User");

const FriendRequest =
  require("../models/FriendRequest");

const Notification =
  require("../models/Notification");

const authMiddleware =
  require("../middleware/authMiddleware");

const router =
  express.Router();

// GET ALL USERS
router.get(

  "/users",

  authMiddleware,

  async (req, res) => {

    try {

      const users =
        await User.find({

          _id: {

            $ne:
              req.user.id

          }

        }).select(
          "-password"
        );

      res.status(200)
        .json(users);

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

// SEND FRIEND REQUEST
router.post(

  "/send-request",

  authMiddleware,

  async (req, res) => {

    try {

      const {
        receiverId
      } = req.body;

      const existingRequest =
        await FriendRequest.findOne({

          sender:
            req.user.id,

          receiver:
            receiverId

        });

      if (existingRequest) {

        return res.status(400)
          .json({

            message:
              "Request already sent"

          });

      }

      const newRequest =
        new FriendRequest({

          sender:
            req.user.id,

          receiver:
            receiverId

        });

      await newRequest.save();

      // CREATE NOTIFICATION
      // GET CURRENT USER
const currentUser =
  await User.findById(
    req.user.id
  );

await Notification.create({

  user:
    receiverId,

  title:
    "New Friend Request",

  message:
    `${currentUser.username} wants to connect with you.`

});

      res.status(201)
        .json({

          message:
            "Friend request sent"

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

// GET MY REQUESTS
router.get(

  "/requests",

  authMiddleware,

  async (req, res) => {

    try {

      const requests =
        await FriendRequest.find({

          receiver:
            req.user.id,

          status:
            "pending"

        }).populate(
          "sender",
          "username email"
        );

      res.status(200)
        .json(
          requests
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

// ACCEPT REQUEST
router.post(

  "/accept-request",

  authMiddleware,

  async (req, res) => {

    try {

      const {
        requestId
      } = req.body;

      const request =
        await FriendRequest.findById(
          requestId
        );

      if (!request) {

        return res.status(404)
          .json({

            message:
              "Request not found"

          });

      }

      request.status =
  "accepted";

await request.save();

// ADD FRIENDS
const senderUser =
  await User.findById(
    request.sender
  );

const receiverUser =
  await User.findById(
    request.receiver
  );

// ADD EACH OTHER
senderUser.friends.push(
  receiverUser._id
);

receiverUser.friends.push(
  senderUser._id
);

await senderUser.save();

await receiverUser.save();

// CREATE NOTIFICATION
await Notification.create({

  user:
    request.sender,

  title:
    "Friend Request Accepted",

  message:
    `${receiverUser.username} accepted your friend request.`

});

res.status(200)
  .json({

    message:
      "Friend request accepted"

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
// GET MY FRIENDS
router.get(

  "/my-friends",

  authMiddleware,

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).populate(

          "friends",

          "username email"

        );

      res.status(200)
        .json(
          user.friends
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