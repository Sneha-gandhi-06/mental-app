import React, {
  useState,
  useEffect
} from "react";

function Games() {

  const [selectedGame, setSelectedGame] =
    useState("");

  const [score, setScore] =
    useState(0);

  const [memoryNumber, setMemoryNumber] =
    useState(
      Math.floor(
        10000 +
        Math.random() * 90000
      )
    );

  const [showMemory, setShowMemory] =
    useState(false);

  const [guess, setGuess] =
    useState("");

  const [circleSize, setCircleSize] =
    useState(120);

  const [mood, setMood] =
    useState("😊");

  const [clicks, setClicks] =
    useState(0);

  const [reactionColor, setReactionColor] =
    useState("#8b5cf6");

  const [targetColor, setTargetColor] =
    useState("#8b5cf6");

  const [colorScore, setColorScore] =
    useState(0);

  // BREATHING ANIMATION
  useEffect(() => {

    if (
      selectedGame === "breathing"
    ) {

      const interval =
        setInterval(() => {

          setCircleSize((prev) =>
            prev === 120
              ? 180
              : 120
          );

        }, 2000);

      return () =>
        clearInterval(interval);

    }

  }, [selectedGame]);

  const colors = [
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f59e0b",
    "#6366f1"
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
            fontSize: 30,
            marginBottom: 5,
            color: "#7c3aed"
          }}
        >
          Wellness Games 🎮
        </h1>

        <p
          style={{
            color: "gray",
            lineHeight: 1.6
          }}
        >
          Relax your mind with calming
          and stress-relief activities.
        </p>

      </div>

      {/* BANNER */}
      <div style={bannerCard}>
        🌸 Mini wellness activities
        designed to reduce stress.
      </div>

      {/* GAME GRID */}
      <div style={gamesGrid}>

        <button
          style={gameCard}
          onClick={() => {
            setSelectedGame(
              "focus"
            );
            setScore(0);
          }}
        >
          🎯 Focus Tap
        </button>

        <button
          style={gameCard}
          onClick={() => {

            setSelectedGame(
              "memory"
            );

            const randomNumber =
              Math.floor(
                10000 +
                Math.random() * 90000
              );

            setMemoryNumber(
              randomNumber
            );

            setShowMemory(true);

            setTimeout(() => {

              setShowMemory(false);

            }, 1000);

          }}
        >
          🧠 Memory
        </button>

        <button
          style={gameCard}
          onClick={() =>
            setSelectedGame(
              "breathing"
            )
          }
        >
          🌬 Breathing
        </button>

        <button
          style={gameCard}
          onClick={() => {

            setSelectedGame(
              "colors"
            );

            setTargetColor(
              colors[
                Math.floor(
                  Math.random() *
                    colors.length
                )
              ]
            );

          }}
        >
          🎨 Color Match
        </button>

        <button
          style={gameCard}
          onClick={() => {

            setSelectedGame(
              "mood"
            );

            const moods = [
              "😊",
              "😌",
              "😔",
              "😡"
            ];

            const randomMood =
              moods[
                Math.floor(
                  Math.random() *
                    moods.length
                )
              ];

            setMood(randomMood);

          }}
        >
          😊 Mood Game
        </button>

        <button
          style={gameCard}
          onClick={() => {

            setSelectedGame(
              "reaction"
            );

            setClicks(0);

          }}
        >
          ⚡ Reaction
        </button>

      </div>

      {/* FOCUS GAME */}
      {selectedGame === "focus" && (

        <div style={activityCard}>

          <h2>
            🎯 Focus Tap
          </h2>

          <p style={smallText}>
            Tap as fast as possible.
          </p>

          <h1>
            Score: {score}
          </h1>

          <button
            onClick={() =>
              setScore(score + 1)
            }
            style={focusBtn}
          >
            TAP
          </button>

        </div>

      )}

      {/* MEMORY GAME */}
      {selectedGame === "memory" && (

        <div style={activityCard}>

          <h2>
            🧠 Memory Challenge
          </h2>

          <p style={smallText}>
            Remember this number.
          </p>

          <h1
            style={{
              fontSize: 42,
              color: "#7c3aed",
              marginTop: 20
            }}
          >
            {showMemory
              ? memoryNumber
              : "?????"}
          </h1>

          <input
            value={guess}
            onChange={(e) =>
              setGuess(
                e.target.value
              )
            }
            placeholder="Enter number"
            style={inputStyle}
          />

          <button
            style={actionBtn}
            onClick={() => {

              if (
                parseInt(
                  guess
                ) === memoryNumber
              ) {

                alert(
                  "Correct 🎉"
                );

              } else {

                alert(
                  "Wrong 😅"
                );

              }

            }}
          >
            Check
          </button>

        </div>

      )}

      {/* BREATHING */}
      {selectedGame ===
        "breathing" && (

        <div style={activityCard}>

          <h2>
            🌬 Breathing Exercise
          </h2>

          <p style={smallText}>
            Inhale deeply. Exhale slowly.
          </p>

          <div
            style={{
              ...breathingCircle,
              width: circleSize,
              height: circleSize,
              transition: "2s"
            }}
          ></div>

        </div>

      )}

      {/* COLOR MATCH */}
      {selectedGame === "colors" && (

        <div style={activityCard}>

          <h2>
            🎨 Color Match
          </h2>

          <p style={smallText}>
            Match the correct color.
          </p>

          <h1>
            Score: {colorScore}
          </h1>

          <div
            style={{
              width: 140,
              height: 140,
              background: targetColor,
              margin: "25px auto",
              borderRadius: 30
            }}
          ></div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 15,
              marginTop: 20
            }}
          >

            {colors.map((clr) => (

              <button
                key={clr}

                onClick={() => {

                  if (
                    clr === targetColor
                  ) {

                    setColorScore(
                      colorScore + 1
                    );

                    alert(
                      "Correct 🎉"
                    );

                  } else {

                    alert(
                      "Wrong 😅"
                    );

                  }

                  setTargetColor(
                    colors[
                      Math.floor(
                        Math.random() *
                          colors.length
                      )
                    ]
                  );

                }}

                style={{
                  height: 80,
                  borderRadius: 24,
                  border: "none",
                  background: clr,
                  cursor: "pointer"
                }}
              ></button>

            ))}

          </div>

        </div>

      )}

      {/* MOOD GAME */}
      {selectedGame === "mood" && (

        <div style={activityCard}>

          <h2>
            😊 Catch Your Mood
          </h2>

          <p style={smallText}>
            Match the correct emoji.
          </p>

          <h1
            style={{
              fontSize: 70,
              marginTop: 20
            }}
          >
            {mood}
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 15,
              marginTop: 30
            }}
          >

            {[
              "😊",
              "😌",
              "😔",
              "😡"
            ].map((emoji) => (

              <button
                key={emoji}
                style={moodGameBtn}

                onClick={() => {

                  if (
                    emoji === mood
                  ) {

                    alert(
                      "Correct 🎉"
                    );

                  } else {

                    alert(
                      "Wrong 😅"
                    );

                  }

                  const moods = [
                    "😊",
                    "😌",
                    "😔",
                    "😡"
                  ];

                  const randomMood =
                    moods[
                      Math.floor(
                        Math.random() *
                          moods.length
                      )
                    ];

                  setMood(randomMood);

                }}
              >
                {emoji}
              </button>

            ))}

          </div>

        </div>

      )}

      {/* REACTION GAME */}
      {selectedGame ===
        "reaction" && (

        <div style={activityCard}>

          <h2>
            ⚡ Catch The Box
          </h2>

          <p style={smallText}>
            Catch the moving box quickly.
          </p>

          <h1>
            Score: {clicks}
          </h1>

          <div
            style={{
              position: "relative",
              height: 350,
              background: "#f3f4f6",
              borderRadius: 30,
              overflow: "hidden",
              marginTop: 20
            }}
          >

            <div
              onClick={(e) => {

                setClicks(
                  clicks + 1
                );

                setReactionColor(
                  colors[
                    Math.floor(
                      Math.random() *
                        colors.length
                    )
                  ]
                );

                e.target.style.left =
                  `${Math.random() * 250}px`;

                e.target.style.top =
                  `${Math.random() * 250}px`;

              }}

              style={{
                width: 80,
                height: 80,
                background:
                  reactionColor,
                borderRadius: 24,
                position: "absolute",
                top: 100,
                left: 100,
                cursor: "pointer",
                transition: "0.2s"
              }}
            ></div>

          </div>

        </div>

      )}

    </div>
  );
}

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
  fontWeight: "bold"
};

const gamesGrid = {
  marginTop: 30,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 15
};

const gameCard = {
  padding: 22,
  borderRadius: 28,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const activityCard = {
  marginTop: 30,
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",
  padding: 30,
  borderRadius: 32,
  textAlign: "center"
};

const smallText = {
  color: "gray",
  marginTop: 10
};

const focusBtn = {
  width: 180,
  height: 180,
  borderRadius: "50%",
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontSize: 28,
  marginTop: 20,
  cursor: "pointer"
};

const breathingCircle = {
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  margin: "30px auto"
};

const inputStyle = {
  width: "100%",
  padding: 16,
  borderRadius: 20,
  border: "none",
  background: "#f3f4f6",
  marginTop: 15
};

const actionBtn = {
  padding: 14,
  borderRadius: 20,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  marginTop: 15,
  cursor: "pointer"
};

const moodGameBtn = {
  padding: 20,
  borderRadius: 24,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontSize: 32,
  cursor: "pointer"
};

export default Games;