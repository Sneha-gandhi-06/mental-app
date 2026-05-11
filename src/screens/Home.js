import React from "react";

function Home() {
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "system-ui",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fdf2f8, #eef2ff)"
      }}
    >
      {/* TOP CARD */}
      <div style={topCard}>
        <h1
          style={{
            fontSize: 34,
            marginBottom: 10,
            color: "#7c3aed"
          }}
        >
          MentalEase 💜
        </h1>

        <p
          style={{
            color: "gray",
            lineHeight: 1.6
          }}
        >
          Your personal AI-powered mental
          wellness companion.
        </p>
      </div>

      {/* DAILY CHECK-IN */}
      <div style={section}>
        <h2 style={title}>
          How are you feeling today?
        </h2>

        <div style={moodGrid}>
          <button style={moodCard}>
            😊 Happy
          </button>

          <button style={moodCard}>
            😌 Calm
          </button>

          <button style={moodCard}>
            😔 Sad
          </button>

          <button style={moodCard}>
            😡 Angry
          </button>
        </div>
      </div>

      {/* DAILY QUOTE */}
      <div style={quoteCard}>
        <h3
          style={{
            marginBottom: 10,
            color: "#7c3aed"
          }}
        >
          🌸 Daily Motivation
        </h3>

        <p
          style={{
            lineHeight: 1.7,
            color: "#4b5563"
          }}
        >
          “Healing doesn’t mean the damage
          never existed. It means it no
          longer controls your life.”
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ marginTop: 30 }}>
        <h2 style={title}>
          Quick Actions
        </h2>

        <div style={actionGrid}>
          <div style={actionCard}>
            💬
            <p>Talk to AI</p>
          </div>

          <div style={actionCard}>
            📓
            <p>Journal</p>
          </div>

          <div style={actionCard}>
            🎵
            <p>Relax</p>
          </div>

          <div style={actionCard}>
            🎮
            <p>Games</p>
          </div>
        </div>
      </div>

      {/* WELLNESS CARD */}
      <div style={wellnessCard}>
        <h2
          style={{
            marginBottom: 10
          }}
        >
          🌿 Wellness Tip
        </h2>

        <p
          style={{
            lineHeight: 1.7,
            color: "#4b5563"
          }}
        >
          Drink water, stretch your body,
          and take 5 slow deep breaths.
        </p>
      </div>
    </div>
  );
}

const topCard = {
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",
  padding: 28,
  borderRadius: 32,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.12)"
};

const section = {
  marginTop: 35
};

const title = {
  marginBottom: 15,
  color: "#6d28d9"
};

const moodGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 15
};

const moodCard = {
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
    "0 8px 25px rgba(236,72,153,0.25)"
};

const quoteCard = {
  marginTop: 30,
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",
  padding: 24,
  borderRadius: 28,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.08)"
};

const actionGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 15
};

const actionCard = {
  background: "#ffffff",
  padding: 25,
  borderRadius: 24,
  textAlign: "center",
  fontSize: 24,
  boxShadow:
    "0 8px 25px rgba(0,0,0,0.05)"
};

const wellnessCard = {
  marginTop: 30,
  background:
    "linear-gradient(135deg, #ddd6fe, #fbcfe8)",
  padding: 28,
  borderRadius: 30,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.12)"
};

export default Home;