import React, {
  useState
} from "react";

function Appointment() {

  const [selectedDoctor,
    setSelectedDoctor] =
    useState("");

  const [selectedTime,
    setSelectedTime] =
    useState("");

  const [sessionType,
    setSessionType] =
    useState("Video");

  const [priority,
    setPriority] =
    useState(false);

  const [appointmentBooked,
    setAppointmentBooked] =
    useState(false);

  // NOTIFICATIONS
  const addNotification = (
    title,
    message
  ) => {

    const existing =
      JSON.parse(
        localStorage.getItem(
          "notifications"
        )
      ) || [];

    const updated = [

      {
        title,
        message,
        time:
          new Date().toLocaleTimeString()
      },

      ...existing

    ];

    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

  };

  // BOOK APPOINTMENT
  const bookAppointment = () => {

    if (
      !selectedDoctor ||
      !selectedTime
    ) {

      alert(
        "Please select doctor and time."
      );

      return;
    }

    const appointment = {

      doctor:
        selectedDoctor,

      time:
        selectedTime,

      type:
        sessionType,

      priority,

      bookedAt:
        new Date().toLocaleString()

    };

    localStorage.setItem(
      "appointment",
      JSON.stringify(
        appointment
      )
    );

    addNotification(
      "Appointment Confirmed",
      `Your ${sessionType} session with ${selectedDoctor} has been booked.`
    );

    setAppointmentBooked(
      true
    );

  };

  const doctors = [

    {
      name:
        "Dr. Sarah Khan",

      specialty:
        "Clinical Psychologist",

      experience:
        "8 Years",

      rating:
        "4.9",

      available:
        "Available Today"
    },

    {
      name:
        "Dr. Arjun Mehta",

      specialty:
        "Mental Wellness Coach",

      experience:
        "6 Years",

      rating:
        "4.8",

      available:
        "Available Tomorrow"
    },

    {
      name:
        "Dr. Emily Joseph",

      specialty:
        "Therapist",

      experience:
        "10 Years",

      rating:
        "5.0",

      available:
        "Available Today"
    }

  ];

  const timings = [

    "10:00 AM",

    "12:00 PM",

    "3:00 PM",

    "5:00 PM",

    "7:00 PM"

  ];

  return (

    <div
      style={{
        padding: 20,
        paddingBottom: 120,
        fontFamily: "system-ui",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fdf2f8, #eef2ff)"
      }}
    >

      {/* HEADER */}
      <div style={headerCard}>

        <h1
          style={{
            fontSize: 32,
            marginBottom: 8,
            color: "#7c3aed"
          }}
        >
          Appointments
        </h1>

        <p
          style={{
            color: "gray",
            lineHeight: 1.7
          }}
        >
          Connect with licensed mental
          wellness specialists.
        </p>

      </div>

      {/* AI BANNER */}
      <div style={bannerCard}>

        AI matched professionals based
        on your emotional wellness
        insights.

      </div>

      {/* DOCTORS */}
      <div style={{ marginTop: 30 }}>

        <h2 style={sectionTitle}>
          Specialists
        </h2>

        {doctors.map(
          (doctor, index) => (

            <div
              key={index}

              style={
                selectedDoctor ===
                doctor.name
                  ? activeDoctorCard
                  : doctorCard
              }

              onClick={() =>
                setSelectedDoctor(
                  doctor.name
                )
              }
            >

              <div
                style={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center"
                }}
              >

                <div>

                  <h3
                    style={{
                      marginBottom: 8,
                      color: "#7c3aed"
                    }}
                  >
                    {doctor.name}
                  </h3>

                  <p style={smallText}>
                    {
                      doctor.specialty
                    }
                  </p>

                  <p style={smallText}>
                    Experience:
                    {" "}
                    {
                      doctor.experience
                    }
                  </p>

                </div>

                <div
                  style={{
                    textAlign:
                      "right"
                  }}
                >

                  <div
                    style={ratingBadge}
                  >
                    ⭐ {
                      doctor.rating
                    }
                  </div>

                  <p
                    style={{
                      color:
                        "#10b981",

                      fontSize: 13,

                      marginTop: 8
                    }}
                  >
                    {
                      doctor.available
                    }
                  </p>

                </div>

              </div>

            </div>

          )
        )}

      </div>

      {/* TIME */}
      <div style={{ marginTop: 30 }}>

        <h2 style={sectionTitle}>
          Select Time
        </h2>

        <div style={timeGrid}>

          {timings.map(
            (time) => (

              <button
                key={time}

                style={
                  selectedTime ===
                  time
                    ? activeTimeBtn
                    : timeBtn
                }

                onClick={() =>
                  setSelectedTime(
                    time
                  )
                }
              >
                {time}
              </button>

            )
          )}

        </div>

      </div>

      {/* SESSION TYPE */}
      <div style={{ marginTop: 30 }}>

        <h2 style={sectionTitle}>
          Session Type
        </h2>

        <div style={timeGrid}>

          {[
            "Video",
            "Audio"
          ].map(
            (type) => (

              <button
                key={type}

                style={
                  sessionType ===
                  type
                    ? activeTimeBtn
                    : timeBtn
                }

                onClick={() =>
                  setSessionType(
                    type
                  )
                }
              >
                {type}
              </button>

            )
          )}

        </div>

      </div>

      {/* PRIORITY */}
      <div style={priorityCard}>

        <div>

          <h3
            style={{
              color: "#7c3aed"
            }}
          >
            Priority Support
          </h3>

          <p
            style={{
              color: "gray"
            }}
          >
            Faster emergency appointments
          </p>

        </div>

        <button
          onClick={() =>
            setPriority(
              !priority
            )
          }

          style={
            priority
              ? activePriorityBtn
              : priorityBtn
          }
        >
          {priority
            ? "Enabled"
            : "Enable"}
        </button>

      </div>

      {/* SESSION INFO */}
      <div style={infoCard}>

        <h2
          style={{
            color: "#7c3aed"
          }}
        >
          Session Information
        </h2>

        <p style={infoText}>
          • 100% confidential sessions
        </p>

        <p style={infoText}>
          • Video and audio consultations
        </p>

        <p style={infoText}>
          • AI-assisted emotional support
        </p>

        <p style={infoText}>
          • Flexible rescheduling support
        </p>

      </div>

      {/* CONFIRMATION */}
      {appointmentBooked && (

        <div style={confirmationCard}>

          <h2
            style={{
              color: "#166534"
            }}
          >
            Appointment Confirmed
          </h2>

          <p style={infoText}>
            Doctor:
            {" "}
            {selectedDoctor}
          </p>

          <p style={infoText}>
            Time:
            {" "}
            {selectedTime}
          </p>

          <p style={infoText}>
            Session:
            {" "}
            {sessionType}
          </p>

          <p style={infoText}>
            Priority:
            {" "}
            {priority
              ? "Enabled"
              : "Disabled"}
          </p>

        </div>

      )}

      {/* BOOK BUTTON */}
      <button
        onClick={bookAppointment}
        style={bookBtn}
      >
        Confirm Appointment
      </button>

    </div>

  );
}

/* STYLES */

const headerCard = {

  background:
    "linear-gradient(135deg, #ffffff, #f5d0fe)",

  padding: 28,

  borderRadius: 32,

  boxShadow:
    "0 12px 35px rgba(236,72,153,0.15)"
};

const bannerCard = {

  marginTop: 20,

  padding: 18,

  borderRadius: 24,

  textAlign: "center",

  background:
    "linear-gradient(135deg, #ddd6fe, #fbcfe8)",

  color: "#6d28d9",

  fontWeight: "bold",

  boxShadow:
    "0 8px 25px rgba(139,92,246,0.12)"
};

const sectionTitle = {

  color: "#7c3aed",

  marginBottom: 15
};

const doctorCard = {

  background:
    "linear-gradient(135deg, #ffffff, #fdf2f8)",

  padding: 22,

  borderRadius: 28,

  marginBottom: 15,

  cursor: "pointer",

  boxShadow:
    "0 10px 30px rgba(236,72,153,0.08)"
};

const activeDoctorCard = {

  background:
    "linear-gradient(135deg, #ede9fe, #fbcfe8)",

  padding: 22,

  borderRadius: 28,

  marginBottom: 15,

  cursor: "pointer",

  border:
    "2px solid #8b5cf6",

  boxShadow:
    "0 12px 35px rgba(139,92,246,0.15)"
};

const smallText = {

  color: "gray",

  marginBottom: 4
};

const ratingBadge = {

  padding: "8px 14px",

  borderRadius: 16,

  background:
    "linear-gradient(135deg, #fef3c7, #fde68a)",

  fontWeight: "bold"
};

const timeGrid = {

  display: "grid",

  gridTemplateColumns:
    "1fr 1fr",

  gap: 12
};

const timeBtn = {

  padding: 16,

  borderRadius: 20,

  border: "none",

  background: "#ffffff",

  cursor: "pointer",

  boxShadow:
    "0 6px 20px rgba(0,0,0,0.05)"
};

const activeTimeBtn = {

  padding: 16,

  borderRadius: 20,

  border: "none",

  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",

  color: "white",

  cursor: "pointer",

  boxShadow:
    "0 8px 25px rgba(236,72,153,0.25)"
};

const infoCard = {

  marginTop: 30,

  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",

  padding: 25,

  borderRadius: 30,

  boxShadow:
    "0 10px 30px rgba(139,92,246,0.08)"
};

const infoText = {

  marginTop: 10,

  color: "#4b5563"
};

const priorityCard = {

  marginTop: 25,

  padding: 22,

  borderRadius: 26,

  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  boxShadow:
    "0 10px 30px rgba(139,92,246,0.08)"
};

const priorityBtn = {

  padding: "12px 18px",

  borderRadius: 18,

  border: "none",

  background: "#e5e7eb",

  cursor: "pointer"
};

const activePriorityBtn = {

  padding: "12px 18px",

  borderRadius: 18,

  border: "none",

  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",

  color: "white",

  cursor: "pointer"
};

const confirmationCard = {

  marginTop: 30,

  padding: 24,

  borderRadius: 28,

  background:
    "linear-gradient(135deg, #dcfce7, #bbf7d0)",

  boxShadow:
    "0 10px 30px rgba(34,197,94,0.15)"
};

const bookBtn = {

  width: "100%",

  marginTop: 30,

  padding: 18,

  borderRadius: 26,

  border: "none",

  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",

  color: "white",

  fontWeight: "bold",

  fontSize: 16,

  cursor: "pointer",

  boxShadow:
    "0 12px 35px rgba(236,72,153,0.25)"
};

export default Appointment;