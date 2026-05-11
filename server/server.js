const express =
  require("express");

const mongoose =
  require("mongoose");

const cors =
  require("cors");

require("dotenv")
  .config();

const authRoutes =
  require("./routes/authRoutes");

const profileRoutes =
  require("./routes/profileRoutes");

const postRoutes =
  require("./routes/postRoutes");

const appointmentRoutes =
  require("./routes/appointmentRoutes");

const notificationRoutes =
  require("./routes/notificationRoutes");

const chatRoutes =
  require("./routes/chatRoutes");

const friendRoutes =
  require("./routes/friendRoutes");

const app =
  express();

const http =
  require("http");

const { Server } =
  require("socket.io");

const server =
  http.createServer(app);

const io =
  new Server(server, {

    cors: {
      origin:
        "http://localhost:3000",

      methods:
        ["GET", "POST"]
    }

  });
app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api",
  profileRoutes
);

app.use(
  "/api/posts",
  postRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/friends",
  friendRoutes
);
// MONGODB CONNECTION
async function connectDB() {

  try {

    await mongoose.connect(
  process.env.MONGO_URI,
  {
    serverSelectionTimeoutMS: 30000,

    tls: true,

    tlsInsecure: true,

    retryWrites: true,

    family: 4
  }
);

    console.log(
      "MongoDB Connected Successfully"
    );

  }

  catch (error) {

  console.log(
    "MongoDB Initial Retry..."
  );

  setTimeout(
    connectDB,
    5000
  );

}

}

connectDB();

// TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "MentalEase Backend Running"
  );

});

const PORT =
  process.env.PORT || 5000;

// SOCKET CONNECTION
io.on(

  "connection",

  (socket) => {

    console.log(
      "User connected:",
      socket.id
    );

    // RECEIVE MESSAGE
    socket.on(

      "send_message",

      (data) => {

        io.emit(
  "receive_message",
  data
);

      }

    );

    // TYPING
    socket.on(

      "typing",

      (data) => {

        socket.broadcast.emit(
          "typing",
          data
        );

      }

    );

    socket.on(

      "disconnect",

      () => {

        console.log(
          "User disconnected:",
          socket.id
        );

      }

    );

  }

);

// START SERVER
server.listen(

  PORT,

  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }

);