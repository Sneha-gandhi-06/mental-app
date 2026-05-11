import axios from "axios";
import React, {
  useState
} from "react";

function Auth({ onLogin }) {

  const [isLogin, setIsLogin] =
    useState(true);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [guardianName, setGuardianName] =
    useState("");

  const [guardianPhone, setGuardianPhone] =
    useState("");

  const [showQuiz, setShowQuiz] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState([]);

  // QUESTIONS
  const questions = [

    {
      question:
        "How often do you feel stressed?",

      options: [
        "Rarely",
        "Sometimes",
        "Often",
        "Almost Always"
      ]
    },

    {
      question:
        "How would you describe your sleep?",

      options: [
        "Very Good",
        "Okay",
        "Poor",
        "Very Poor"
      ]
    },

    {
      question:
        "Do you often overthink situations?",

      options: [
        "Never",
        "Sometimes",
        "Frequently",
        "Constantly"
      ]
    },

    {
      question:
        "How emotionally supported do you feel?",

      options: [
        "Very Supported",
        "Somewhat",
        "Rarely",
        "Not At All"
      ]
    },

    {
      question:
        "How often do you feel anxious?",

      options: [
        "Rarely",
        "Sometimes",
        "Often",
        "Very Often"
      ]
    }

  ];

  // LOGIN / SIGNUP
  const handleSubmit = () => {

    if (
      !email ||
      !password
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    // LOGIN
    if (isLogin) {

      onLogin();

      return;

    }

    // SIGNUP -> QUIZ
    setShowQuiz(true);

  };

  // ANSWER QUESTION
  const answerQuestion = (
    option
  ) => {

    const updatedAnswers = [
      ...answers,
      option
    ];

    setAnswers(
      updatedAnswers
    );

    // NEXT QUESTION
    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

    }

    // FINISH QUIZ
    else {

      localStorage.setItem(
        "user",

        JSON.stringify({
          name:
            name || "User",

          email,

          guardianName,

          guardianPhone
        })
      );

      localStorage.setItem(
        "wellnessAnswers",

        JSON.stringify(
          updatedAnswers
        )
      );

      onLogin();

    }

  };

  // QUIZ SCREEN
  if (showQuiz) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(180deg, #fdf2f8, #eef2ff)",
          padding: 20,
          fontFamily: "system-ui"
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth: 500,
            background:
              "rgba(255,255,255,0.8)",
            backdropFilter:
              "blur(18px)",
            padding: 35,
            borderRadius: 35,
            boxShadow:
              "0 15px 40px rgba(139,92,246,0.15)"
          }}
        >

          {/* PROGRESS */}
          <div
            style={{
              marginBottom: 25
            }}
          >

            <div
              style={{
                height: 10,
                borderRadius: 20,
                background:
                  "#ede9fe",
                overflow: "hidden"
              }}
            >

              <div
                style={{
                  width:
                    `${
                      (
                        (currentQuestion + 1)
                        /
                        questions.length
                      ) * 100
                    }%`,

                  height: "100%",

                  background:
                    "linear-gradient(135deg, #8b5cf6, #ec4899)"
                }}
              ></div>

            </div>

          </div>

          {/* TITLE */}
          <h2
            style={{
              color: "#7c3aed",
              marginBottom: 10
            }}
          >
            Wellness Assessment
          </h2>

          <p
            style={{
              color: "gray",
              marginBottom: 30
            }}
          >
            Help us personalize your
            wellness experience.
          </p>

          {/* QUESTION */}
          <h3
            style={{
              marginBottom: 25,
              lineHeight: 1.5
            }}
          >
            {
              questions[
                currentQuestion
              ].question
            }
          </h3>

          {/* OPTIONS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15
            }}
          >

            {questions[
              currentQuestion
            ].options.map(
              (
                option,
                index
              ) => (

                <button
                  key={index}

                  onClick={() =>
                    answerQuestion(
                      option
                    )
                  }

                  style={{
                    padding: 18,
                    border: "none",
                    borderRadius: 22,
                    background:
                      "linear-gradient(135deg, #ddd6fe, #fbcfe8)",
                    color: "#6d28d9",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: 15
                  }}
                >

                  {option}

                </button>

              )
            )}

          </div>

        </div>

      </div>

    );

  }

  // AUTH SCREEN
  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, #fdf2f8, #eef2ff)",
        padding: 20,
        fontFamily: "system-ui",
        overflow: "hidden",
        position: "relative"
      }}
    >

      {/* BLOBS */}
      <div style={blob1}></div>
      <div style={blob2}></div>

      {/* CARD */}
      <div style={card}>

        {/* LOGO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 25
          }}
        >

          <div style={logo}>
            💜
          </div>

          <h1
            style={{
              fontSize: 38,
              color: "#7c3aed",
              marginTop: 20,
              marginBottom: 10
            }}
          >
            MentalEase
          </h1>

          <p
            style={{
              color: "gray",
              lineHeight: 1.6
            }}
          >
            Your emotional wellness
            companion
          </p>

        </div>

        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            color: "#7c3aed",
            marginBottom: 25
          }}
        >
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        {/* NAME */}
        {!isLogin && (

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            style={input}
          />

        )}

        {/* GUARDIAN NAME */}
        {!isLogin && (

          <input
            placeholder="Guardian Name"
            value={guardianName}
            onChange={(e) =>
              setGuardianName(
                e.target.value
              )
            }
            style={input}
          />

        )}

        {/* GUARDIAN PHONE */}
        {!isLogin && (

          <input
            placeholder="Guardian Contact Number"
            value={guardianPhone}
            onChange={(e) =>
              setGuardianPhone(
                e.target.value
              )
            }
            style={input}
          />

        )}

        {/* EMAIL */}
        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={input}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={input}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          style={button}
        >
          {isLogin
            ? "Login"
            : "Continue"}
        </button>

        {/* SWITCH */}
        <p
          style={{
            marginTop: 25,
            textAlign: "center",
            color: "gray"
          }}
        >

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setIsLogin(
                !isLogin
              )
            }

            style={{
              color: "#7c3aed",
              fontWeight: "bold",
              marginLeft: 8,
              cursor: "pointer"
            }}
          >
            {isLogin
              ? "Sign Up"
              : "Login"}
          </span>

        </p>

      </div>

    </div>

  );
}

/* STYLES */

const card = {
  width: "100%",
  maxWidth: 420,
  background:
    "rgba(255,255,255,0.7)",
  backdropFilter: "blur(18px)",
  padding: 35,
  borderRadius: 35,
  boxShadow:
    "0 15px 40px rgba(139,92,246,0.15)",
  position: "relative",
  zIndex: 2
};

const logo = {
  width: 110,
  height: 110,
  borderRadius: "50%",
  margin: "auto",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 45,
  color: "white",
  boxShadow:
    "0 12px 35px rgba(236,72,153,0.25)"
};

const input = {
  width: "100%",
  padding: 18,
  marginBottom: 18,
  borderRadius: 22,
  border: "none",
  background: "#ffffff",
  outline: "none",
  fontSize: 15,
  boxSizing: "border-box",
  boxShadow:
    "0 6px 20px rgba(99,102,241,0.08)"
};

const button = {
  width: "100%",
  padding: 18,
  borderRadius: 24,
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

const blob1 = {
  width: 250,
  height: 250,
  background: "#ddd6fe",
  borderRadius: "50%",
  position: "absolute",
  top: -80,
  left: -80,
  filter: "blur(40px)",
  opacity: 0.6
};

const blob2 = {
  width: 250,
  height: 250,
  background: "#fbcfe8",
  borderRadius: "50%",
  position: "absolute",
  bottom: -80,
  right: -80,
  filter: "blur(40px)",
  opacity: 0.6
};

export default Auth;