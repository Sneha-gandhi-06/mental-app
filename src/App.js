import { useState } from "react";

import Home from "./screens/Home";
import Chat from "./screens/Chat";
import Journal from "./screens/Journal";
import Insights from "./screens/Insights";
import SOS from "./screens/SOS";
import Appointments from "./screens/Appointments";
import Relax from "./screens/Relax";
import Games from "./screens/Games";
import Auth from "./screens/Auth";
import Profile from "./screens/Profile";
import Friends from "./screens/Friends";

function App() {

  const [screen, setScreen] =
    useState("home");

  const [darkMode, setDarkMode] =
    useState(false);

  const [loggedIn, setLoggedIn] =
    useState(
      localStorage.getItem("user")
        ? true
        : false
    );

  // NOTIFICATIONS
  const [showNotifications,
    setShowNotifications] =
    useState(false);

  const [notifications] =
    useState([

      {
        title:
          "Appointment Confirmed",

        message:
          "Your therapy session has been booked successfully."
      },

      {
        title:
          "New Friend Request",

        message:
          "Aarav wants to connect with you."
      },

      {
        title:
          "Mood Reminder",

        message:
          "Don’t forget to journal today."
      }

    ]);

  // NAV ITEMS
  const navItems = [

    {
      key: "chat",
      label: "Chat"
    },

    {
      key: "journal",
      label: "Journal"
    },

    {
      key: "insights",
      label: "Insights"
    },

    {
      key: "appointments",
      label: "Doctors"
    },

    {
      key: "relax",
      label: "Relax"
    },

    {
      key: "games",
      label: "Games"
    },

    {
      key: "friends",
      label: "Friends"
    }

  ];

  // LOGIN SCREEN
  if (!loggedIn) {

    return (
      <Auth
        onLogin={() =>
          setLoggedIn(true)
        }
      />
    );

  }

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    setLoggedIn(false);

  };

  return (

    <div
      style={{
        minHeight: "100vh",

        background: darkMode
          ? "linear-gradient(180deg, #000000, #0f172a)"
          : "linear-gradient(180deg, #fdf2f8, #eef2ff)",

        color: darkMode
          ? "#ffffff"
          : "#111827",

        fontFamily: "system-ui",

        transition: "0.3s",

        paddingBottom: 120
      }}
    >

      {/* TOP BAR */}
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          padding: 20,

          position: "sticky",

          top: 0,

          zIndex: 100,

          backdropFilter:
            "blur(18px)",

          background: darkMode
            ? "rgba(0,0,0,0.92)"
            : "rgba(255,255,255,0.75)",

          borderBottom: darkMode
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.05)"
        }}
      >

        {/* APP NAME */}
        <div>

          <h1
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: "800",
              color: darkMode
                ? "#f9a8d4"
                : "#7c3aed"
            }}
          >
            MentalEase
          </h1>

          <p
            style={{
              margin: 0,
              color: darkMode
                ? "#9ca3af"
                : "#6b7280",
              fontSize: 14
            }}
          >
            Emotional wellness platform
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            position: "relative"
          }}
        >

          {/* NOTIFICATION BELL */}
          <div
            style={{
              position: "relative"
            }}
          >

            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }

              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "none",
                background:
                  "linear-gradient(135deg, #8b5cf6, #ec4899)",
                color: "white",
                fontSize: 20,
                cursor: "pointer",
                boxShadow:
                  "0 8px 20px rgba(139,92,246,0.3)"
              }}
            >
              🔔
            </button>

            {/* BADGE */}
            <div
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#ef4444",
                color: "white",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}
            >
              {notifications.length}
            </div>

            {/* DROPDOWN */}
            {showNotifications && (

              <div
                style={{
                  position: "absolute",
                  top: 60,
                  right: 0,
                  width: 320,
                  maxHeight: 400,
                  overflowY: "auto",
                  background:
                    "rgba(255,255,255,0.95)",
                  backdropFilter:
                    "blur(18px)",
                  borderRadius: 25,
                  padding: 20,
                  boxShadow:
                    "0 15px 40px rgba(0,0,0,0.15)",
                  zIndex: 9999
                }}
              >

                <h3
                  style={{
                    marginTop: 0,
                    color: "#7c3aed"
                  }}
                >
                  Notifications
                </h3>

                {notifications.map(
                  (
                    notification,
                    index
                  ) => (

                    <div
                      key={index}

                      style={{
                        padding: 15,
                        borderRadius: 18,
                        background:
                          "linear-gradient(135deg, #f5f3ff, #fdf2f8)",
                        marginBottom: 12
                      }}
                    >

                      <h4
                        style={{
                          margin: 0,
                          color: "#6d28d9"
                        }}
                      >
                        {
                          notification.title
                        }
                      </h4>

                      <p
                        style={{
                          marginTop: 8,
                          color: "#6b7280",
                          lineHeight: 1.5,
                          fontSize: 14
                        }}
                      >
                        {
                          notification.message
                        }
                      </p>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* PROFILE */}
          <button
            onClick={() =>
              setScreen("profile")
            }

            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "none",
              background:
                "linear-gradient(135deg, #8b5cf6, #ec4899)",
              color: "white",
              fontSize: 20,
              cursor: "pointer",
              boxShadow:
                "0 8px 20px rgba(139,92,246,0.3)"
            }}
          >
            👤
          </button>

          {/* THEME */}
          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }

            style={{
              padding: "10px 18px",

              border: "none",

              borderRadius: 18,

              background:
                "linear-gradient(135deg, #8b5cf6, #ec4899)",

              color: "white",

              fontWeight: "bold",

              cursor: "pointer"
            }}
          >
            {darkMode
              ? "Light"
              : "Dark"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={logout}

            style={{
              padding: "10px 18px",

              border: "none",

              borderRadius: 18,

              background:
                "linear-gradient(135deg, #ef4444, #dc2626)",

              color: "white",

              fontWeight: "bold",

              cursor: "pointer",

              boxShadow:
                "0 8px 20px rgba(239,68,68,0.25)"
            }}
          >
            Logout
          </button>

        </div>

      </div>

      {/* BACK BUTTON */}
      {screen !== "home" && (

        <div
          style={{
            paddingLeft: 20,
            paddingTop: 15
          }}
        >

          <button
            onClick={() =>
              setScreen("home")
            }

            style={{
              padding: "12px 20px",

              border: "none",

              borderRadius: 18,

              background:
                "linear-gradient(135deg, #ddd6fe, #fbcfe8)",

              color: "#6d28d9",

              fontWeight: "bold",

              cursor: "pointer"
            }}
          >
            ← Back
          </button>

        </div>

      )}

      {/* MAIN CONTENT */}
      <div
        style={{
          padding: 20
        }}
      >

        {screen === "home" &&
          <Home darkMode={darkMode} />}

        {screen === "chat" &&
          <Chat darkMode={darkMode} />}

        {screen === "journal" &&
          <Journal darkMode={darkMode} />}

        {screen === "insights" &&
          <Insights darkMode={darkMode} />}

        {screen ===
          "appointments" &&
          <Appointments darkMode={darkMode} />}

        {screen === "sos" &&
          <SOS darkMode={darkMode} />}

        {screen === "relax" &&
          <Relax darkMode={darkMode} />}

        {screen === "games" &&
          <Games darkMode={darkMode} />}

        {screen === "profile" &&
          <Profile darkMode={darkMode} />}

        {screen === "friends" &&
          <Friends darkMode={darkMode} />}

      </div>

      {/* CENTER NAVIGATION */}
      <div
        style={{
          position: "fixed",

          bottom: 20,

          left: "50%",

          transform:
            "translateX(-50%)",

          width: "90%",

          maxWidth: 900,

          display: "flex",

          justifyContent:
            "center",

          gap: 12,

          flexWrap: "wrap",

          padding: 18,

          borderRadius: 28,

          backdropFilter:
            "blur(18px)",

          background: darkMode
            ? "rgba(0,0,0,0.92)"
            : "rgba(255,255,255,0.82)",

          boxShadow: darkMode
            ? "0 10px 30px rgba(0,0,0,0.4)"
            : "0 10px 30px rgba(0,0,0,0.08)",

          zIndex: 999
        }}
      >

        {navItems.map(
          (item) => (

            <button
              key={item.key}

              onClick={() =>
                setScreen(
                  item.key
                )
              }

              style={{
                border: "none",

                padding:
                  "14px 22px",

                borderRadius: 18,

                cursor: "pointer",

                fontWeight: "bold",

                transition: "0.3s",

                background:
                  screen ===
                  item.key
                    ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                    : darkMode
                    ? "#111827"
                    : "#ffffff",

                color:
                  screen ===
                  item.key
                    ? "white"
                    : darkMode
                    ? "#d1d5db"
                    : "#6b7280",

                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)"
              }}
            >

              {item.label}

            </button>

          )
        )}

      </div>

      {/* SOS BUTTON */}
      <button
        onClick={() =>
          setScreen("sos")
        }

        style={{
          position: "fixed",

          right: 25,

          bottom: 120,

          width: 75,

          height: 75,

          borderRadius: "50%",

          border: "none",

          background:
            "linear-gradient(135deg, #ef4444, #dc2626)",

          color: "white",

          fontWeight: "bold",

          fontSize: 20,

          cursor: "pointer",

          zIndex: 1000,

          boxShadow:
            "0 12px 30px rgba(239,68,68,0.45)"
        }}
      >
        SOS
      </button>

    </div>

  );
}

export default App;