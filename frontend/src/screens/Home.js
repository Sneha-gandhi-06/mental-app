import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

function Home() {

  const [postContent,
    setPostContent] =
    useState("");

  const [posts,
    setPosts] =
    useState([]);

  const [selectedMood,
    setSelectedMood] =
    useState("");

  // FETCH POSTS
  useEffect(() => {

    fetchPosts();

  }, []);

  const fetchPosts =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/posts/all"
          );

        setPosts(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // CREATE POST
  const createPost =
    async () => {

      if (!postContent.trim())
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "http://localhost:5000/api/posts/create",

          {
            content:
              postContent
          },

          {
            headers: {

              authorization:
                token

            }
          }

        );

        setPostContent("");

        fetchPosts();

      }

      catch (error) {

        console.log(error);

      }

    };

  const moods = [

    "😊 Happy",

    "😌 Calm",

    "😔 Sad",

    "😡 Angry"

  ];

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
          Your personal AI-powered
          mental wellness companion.
        </p>

      </div>

      {/* DAILY CHECK-IN */}
      <div style={section}>

        <h2 style={title}>
          How are you feeling today?
        </h2>

        <div style={moodGrid}>

          {moods.map((mood) => (

            <button

              key={mood}

              style={{
                ...moodCard,

                border:
                  selectedMood === mood
                    ? "3px solid white"
                    : "none"
              }}

              onClick={() =>
                setSelectedMood(mood)
              }
            >
              {mood}
            </button>

          ))}

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
          “Healing doesn’t mean
          the damage never existed.
          It means it no longer
          controls your life.”
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

      {/* COMMUNITY FEED */}
      <div style={{ marginTop: 35 }}>

        <h2 style={title}>
          Community Support Wall
        </h2>

        {/* CREATE POST */}
        <div style={communityCard}>

          <textarea

            value={postContent}

            onChange={(e) =>
              setPostContent(
                e.target.value
              )
            }

            placeholder=
              "Share your thoughts..."

            style={postInput}
          />

          <button
            onClick={createPost}
            style={postBtn}
          >
            Share Post
          </button>

        </div>

        {/* POSTS */}
        <div style={{
          marginTop: 20
        }}>

          {posts.map((post) => (

            <div
              key={post._id}
              style={postCard}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom: 10
                }}
              >

                <h3
                  style={{
                    color: "#7c3aed"
                  }}
                >
                  {post.username}
                </h3>

                <p
                  style={{
                    color: "gray",
                    fontSize: 13
                  }}
                >
                  ❤️ {post.likes}
                </p>

              </div>

              <p
                style={{
                  lineHeight: 1.7,
                  color: "#4b5563"
                }}
              >
                {post.content}
              </p>

            </div>

          ))}

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
          Drink water,
          stretch your body,
          and take 5 slow deep breaths.
        </p>

      </div>

    </div>

  );

}

/* STYLES */

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
    "0 8px 25px rgba(0,0,0,0.05)",
  cursor: "pointer"
};

const communityCard = {
  background:
    "rgba(255,255,255,0.7)",
  padding: 24,
  borderRadius: 28,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.08)"
};

const postInput = {
  width: "100%",
  minHeight: 100,
  borderRadius: 20,
  border: "none",
  padding: 18,
  outline: "none",
  fontSize: 15,
  boxSizing: "border-box",
  marginBottom: 15,
  background: "#ffffff"
};

const postBtn = {
  padding: "14px 24px",
  borderRadius: 20,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const postCard = {
  background:
    "rgba(255,255,255,0.8)",
  padding: 22,
  borderRadius: 24,
  marginBottom: 15,
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