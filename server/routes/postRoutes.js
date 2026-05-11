const express =
  require("express");

const Post =
  require("../models/Post");

const User =
  require("../models/User");

const authMiddleware =
  require("../middleware/authMiddleware");

const router =
  express.Router();

// CREATE POST
router.post(

  "/create",

  authMiddleware,

  async (req, res) => {

    try {

      const {
        content
      } = req.body;

      // GET USER
      const user =
        await User.findById(
          req.user.id
        );

      const newPost =
        new Post({

          user:
            req.user.id,

          username:
            user.username,

          content

        });

      await newPost.save();

      res.status(201)
        .json({

          message:
            "Post created successfully",

          post:
            newPost

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

// GET ALL POSTS
router.get(

  "/all",

  async (req, res) => {

    try {

      const posts =
        await Post.find()
          .sort({
            createdAt: -1
          });

      res.status(200)
        .json(posts);

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