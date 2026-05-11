const express =
  require("express");

const Appointment =
  require("../models/Appointment");

const Notification =
  require("../models/Notification");

const authMiddleware =
  require("../middleware/authMiddleware");

const router =
  express.Router();

// CREATE APPOINTMENT
router.post(

  "/book",

  authMiddleware,

  async (req, res) => {

    try {

      const {
        therapist,
        date,
        time
      } = req.body;

      const newAppointment =
        new Appointment({

          user:
            req.user.id,

          therapist,

          date,

          time

        });

      await newAppointment.save();
      // CREATE NOTIFICATION
await Notification.create({

  user:
    req.user.id,

  title:
    "Appointment Confirmed",

  message:
    `Your session with ${therapist} has been booked for ${time}.`

});

      res.status(201)
        .json({

          message:
            "Appointment booked successfully",

          appointment:
            newAppointment

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

// GET USER APPOINTMENTS
router.get(

  "/my",

  authMiddleware,

  async (req, res) => {

    try {

      const appointments =
        await Appointment.find({

          user:
            req.user.id

        }).sort({
          createdAt: -1
        });

      res.status(200)
        .json(
          appointments
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