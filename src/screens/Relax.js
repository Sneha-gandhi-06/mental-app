import React, { useState } from "react";

function Relax() {

  const [selected, setSelected] =
    useState("");

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
          Relax & Calm 🎵
        </h1>

        <p
          style={{
            color: "gray",
            lineHeight: 1.6
          }}
        >
          Immerse yourself in peaceful
          sounds and emotional healing.
        </p>

      </div>

      {/* AI BANNER */}
      <div style={bannerCard}>
        🤖 AI recommends calming audio
        based on your emotional state.
      </div>

      {/* SOUND GRID */}
      <div style={grid}>

        <button
          style={soundCard}
          onClick={() =>
            setSelected("rain")
          }
        >
          🌧 Rain
        </button>

        <button
          style={soundCard}
          onClick={() =>
            setSelected("ocean")
          }
        >
          🌊 Ocean
        </button>

        <button
          style={soundCard}
          onClick={() =>
            setSelected("forest")
          }
        >
          🌿 Forest
        </button>

        <button
          style={soundCard}
          onClick={() =>
            setSelected("piano")
          }
        >
          🎹 Piano
        </button>

        <button
          style={soundCard}
          onClick={() =>
            setSelected(
              "meditation"
            )
          }
        >
          🧘 Meditation
        </button>

        <button
          style={soundCard}
          onClick={() =>
            setSelected("sleep")
          }
        >
          🌙 Sleep
        </button>

      </div>

      {/* PLAYER */}
      {selected && (

        <div style={playerCard}>

          <h2
            style={{
              color: "#7c3aed",
              marginBottom: 10
            }}
          >
            {selected === "rain" &&
              "🌧 Rain Ambience"}

            {selected === "ocean" &&
              "🌊 Ocean Waves"}

            {selected === "forest" &&
              "🌿 Forest Sounds"}

            {selected === "piano" &&
              "🎹 Calm Piano"}

            {selected ===
              "meditation" &&
              "🧘 Meditation"}

            {selected === "sleep" &&
              "🌙 Sleep Therapy"}
          </h2>

          <p style={smallText}>
            Relax your mind and breathe
            slowly while listening.
          </p>

          {/* AUDIO PLAYER */}
          <audio
            controls
            style={{
              width: "100%",
              marginTop: 20
            }}
          >

            {selected === "rain" && (
              <source
                src="/audio/rain.mp3"
                type="audio/mpeg"
              />
            )}

            {selected === "ocean" && (
              <source
                src="/audio/ocean.mp3"
                type="audio/mpeg"
              />
            )}

            {selected === "forest" && (
              <source
                src="/audio/forest.mp3"
                type="audio/mpeg"
              />
            )}

            {selected === "piano" && (
              <source
                src="/audio/piano.mp3"
                type="audio/mpeg"
              />
            )}

            {selected ===
              "meditation" && (
              <source
                src="/audio/meditation.mp3"
                type="audio/mpeg"
              />
            )}

            {selected === "sleep" && (
              <source
                src="/audio/sleep.mp3"
                type="audio/mpeg"
              />
            )}

          </audio>

        </div>

      )}

      {/* WELLNESS CARD */}
      <div style={wellnessCard}>

        <h2
          style={{
            color: "#7c3aed"
          }}
        >
          🌸 Wellness Tip
        </h2>

        <p style={smallText}>
          Listening to calming ambience
          for just 10 minutes can lower
          stress and improve emotional
          balance.
        </p>

      </div>

      {/* BREATHING CARD */}
      <div style={breathingCard}>

        <h2
          style={{
            color: "#7c3aed"
          }}
        >
          🌬 Guided Breathing
        </h2>

        <p style={smallText}>
          Inhale deeply for 4 seconds.
          Hold. Exhale slowly.
        </p>

        <div style={circle}></div>

      </div>

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
  fontWeight: "bold",
  boxShadow:
    "0 8px 25px rgba(139,92,246,0.12)"
};

const grid = {
  marginTop: 30,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 15
};

const soundCard = {
  padding: 22,
  borderRadius: 28,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
  cursor: "pointer",
  boxShadow:
    "0 10px 30px rgba(236,72,153,0.2)"
};

const playerCard = {
  marginTop: 30,
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",
  padding: 28,
  borderRadius: 32,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.1)"
};

const wellnessCard = {
  marginTop: 30,
  background:
    "linear-gradient(135deg, #ffffff, #fdf2f8)",
  padding: 28,
  borderRadius: 30,
  boxShadow:
    "0 10px 30px rgba(236,72,153,0.1)"
};

const breathingCard = {
  marginTop: 20,
  background:
    "linear-gradient(135deg, #ede9fe, #fbcfe8)",
  padding: 28,
  borderRadius: 30,
  textAlign: "center",
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.12)"
};

const circle = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  margin: "25px auto",
  boxShadow:
    "0 10px 30px rgba(236,72,153,0.2)"
};

const smallText = {
  marginTop: 10,
  color: "#4b5563",
  lineHeight: 1.7
};

export default Relax;