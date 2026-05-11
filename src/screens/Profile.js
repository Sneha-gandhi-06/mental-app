import React from "react";

function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {
      name: "Guest User",
      email: "guest@gmail.com"
    };

  const journalEntries =
    JSON.parse(
      localStorage.getItem(
        "journalEntries"
      )
    ) || {};

  const journalCount =
    Object.keys(journalEntries).length;

  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 120,
        minHeight: "100vh",
        fontFamily: "system-ui",
        background:
          "linear-gradient(180deg, #fdf2f8, #eef2ff)",
        overflow: "hidden",
        position: "relative"
      }}
    >

      {/* FLOATING BLOBS */}
      <div style={blob1}></div>
      <div style={blob2}></div>

      {/* PROFILE CARD */}
      <div style={profileCard}>

        {/* AVATAR */}
        <div style={avatar}>
          💜
        </div>

        <h1
          style={{
            marginTop: 15,
            color: "#7c3aed"
          }}
        >
          {user.name}
        </h1>

        <p
          style={{
            color: "gray"
          }}
        >
          {user.email}
        </p>

      </div>

      {/* STATS */}
      <div style={statsGrid}>

        <div style={statCard}>
          <h2>🔥</h2>
          <h3>5 Day</h3>
          <p>Streak</p>
        </div>

        <div style={statCard}>
          <h2>📓</h2>
          <h3>
            {journalCount}
          </h3>
          <p>Journals</p>
        </div>

        <div style={statCard}>
          <h2>🎮</h2>
          <h3>48</h3>
          <p>Games</p>
        </div>

        <div style={statCard}>
          <h2>🌸</h2>
          <h3>Level 8</h3>
          <p>Wellness</p>
        </div>

      </div>

      {/* BADGES */}
      <div style={sectionCard}>

        <h2
          style={{
            color: "#7c3aed"
          }}
        >
          🏅 Wellness Badges
        </h2>

        <div style={badgeGrid}>

          <div style={badge}>
            🌸 Calm Mind
          </div>

          <div style={badge}>
            ✨ Self Care Star
          </div>

          <div style={badge}>
            🎯 Focus Master
          </div>

          <div style={badge}>
            💜 Journal Hero
          </div>

        </div>

      </div>

      {/* AI SUMMARY */}
      <div style={sectionCard}>

        <h2
          style={{
            color: "#7c3aed"
          }}
        >
          🤖 AI Wellness Summary
        </h2>

        <p
          style={{
            color: "#4b5563",
            lineHeight: 1.8,
            marginTop: 10
          }}
        >
          You’ve shown consistent emotional
          awareness and self-care habits.
          Your journaling streak and wellness
          activities indicate positive
          mental growth 💜
        </p>

      </div>

      {/* FAVORITE ACTIVITIES */}
      <div style={sectionCard}>

        <h2
          style={{
            color: "#7c3aed"
          }}
        >
          🌿 Favorite Activities
        </h2>

        <div style={activityList}>
          🎵 Relax Music
        </div>

        <div style={activityList}>
          📓 Journaling
        </div>

        <div style={activityList}>
          🌬 Breathing Exercise
        </div>

      </div>

    </div>
  );
}

const profileCard = {
  position: "relative",
  zIndex: 2,
  background:
    "rgba(255,255,255,0.6)",
  backdropFilter: "blur(18px)",
  padding: 35,
  borderRadius: 35,
  textAlign: "center",
  boxShadow:
    "0 15px 40px rgba(139,92,246,0.15)"
};

const avatar = {
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

const statsGrid = {
  marginTop: 30,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 15
};

const statCard = {
  background:
    "rgba(255,255,255,0.6)",
  backdropFilter: "blur(18px)",
  padding: 25,
  borderRadius: 28,
  textAlign: "center",
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.08)"
};

const sectionCard = {
  marginTop: 25,
  background:
    "rgba(255,255,255,0.6)",
  backdropFilter: "blur(18px)",
  padding: 28,
  borderRadius: 30,
  boxShadow:
    "0 10px 30px rgba(236,72,153,0.08)",
  position: "relative",
  zIndex: 2
};

const badgeGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 15,
  marginTop: 20
};

const badge = {
  padding: 16,
  borderRadius: 22,
  background:
    "linear-gradient(135deg, #ddd6fe, #fbcfe8)",
  textAlign: "center",
  fontWeight: "bold",
  color: "#6d28d9"
};

const activityList = {
  marginTop: 15,
  padding: 16,
  borderRadius: 20,
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)"
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

export default Profile;