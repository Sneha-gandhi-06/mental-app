const jwt =
  require("jsonwebtoken");

const authMiddleware =
  (req, res, next) => {

    try {

      // GET TOKEN
      const token =
        req.headers.authorization;

      if (!token) {

        return res.status(401)
          .json({
            message:
              "No token provided"
          });

      }

      // VERIFY TOKEN
      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      // SAVE USER DATA
      req.user =
        decoded;

      next();

    }

    catch (error) {

      res.status(401)
        .json({
          message:
            "Invalid token"
        });

    }

  };

module.exports =
  authMiddleware;