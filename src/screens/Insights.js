import React, {
  useEffect,
  useState
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function Insights() {

  const [data, setData] =
    useState([]);

  const [weeklyData,
    setWeeklyData] =
    useState([]);

  const [dominantMood,
    setDominantMood] =
    useState("");

  const [moodScore,
    setMoodScore] =
    useState(0);

  useEffect(() => {

    const entries =
      JSON.parse(
        localStorage.getItem(
          "journalEntries"
        )
      ) || {};

    let happy = 0;
    let sad = 0;
    let angry = 0;
    let calm = 0;
    let anxious = 0;
    let relaxed = 0;

    Object.values(entries).forEach(
      (entry) => {

        const text =
          entry.toLowerCase();

        if (
          text.includes("happy") ||
          text.includes("good") ||
          text.includes("great")
        ) {

          happy++;

        }

        else if (
          text.includes("sad") ||
          text.includes("depressed")
        ) {

          sad++;

        }

        else if (
          text.includes("angry") ||
          text.includes("mad")
        ) {

          angry++;

        }

        else if (
          text.includes("anxious") ||
          text.includes("stress")
        ) {

          anxious++;

        }

        else if (
          text.includes("relaxed") ||
          text.includes("peaceful")
        ) {

          relaxed++;

        }

        else {

          calm++;

        }

      }
    );

    const total =
      happy +
      sad +
      angry +
      calm +
      anxious +
      relaxed;

    const moodData = [

      {
        name: "Happy",
        value: happy,
        percentage:
          total
            ? (
                (happy / total) *
                100
              ).toFixed(1)
            : 0
      },

      {
        name: "Sad",
        value: sad,
        percentage:
          total
            ? (
                (sad / total) *
                100
              ).toFixed(1)
            : 0
      },

      {
        name: "Angry",
        value: angry,
        percentage:
          total
            ? (
                (angry / total) *
                100
              ).toFixed(1)
            : 0
      },

      {
        name: "Calm",
        value: calm,
        percentage:
          total
            ? (
                (calm / total) *
                100
              ).toFixed(1)
            : 0
      },

      {
        name: "Anxious",
        value: anxious,
        percentage:
          total
            ? (
                (anxious / total) *
                100
              ).toFixed(1)
            : 0
      },

      {
        name: "Relaxed",
        value: relaxed,
        percentage:
          total
            ? (
                (relaxed / total) *
                100
              ).toFixed(1)
            : 0
      }

    ];

    setData(moodData);

    // DOMINANT MOOD
    const dominant =
      moodData.reduce(
        (prev, current) =>
          prev.value >
          current.value
            ? prev
            : current
      );

    setDominantMood(
      dominant.name
    );

    // MOOD SCORE
    const positive =
      happy +
      calm +
      relaxed;

    const score =
      total
        ? Math.round(
            (positive /
              total) *
              100
          )
        : 0;

    setMoodScore(score);

    // WEEKLY GRAPH
    setWeeklyData([

      {
        day: "Mon",
        mood: 65
      },

      {
        day: "Tue",
        mood: 70
      },

      {
        day: "Wed",
        mood: 58
      },

      {
        day: "Thu",
        mood: 80
      },

      {
        day: "Fri",
        mood: 74
      },

      {
        day: "Sat",
        mood: 88
      },

      {
        day: "Sun",
        mood: 92
      }

    ]);

  }, []);

  const COLORS = [

    "#ec4899", // happy
    "#3b82f6", // sad
    "#ef4444", // angry
    "#8b5cf6", // calm
    "#facc15", // anxious
    "#22c55e" // relaxed

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
            marginBottom: 5,
            color: "#7c3aed"
          }}
        >
          Mood Insights
        </h1>

        <p
          style={{
            color: "gray"
          }}
        >
          AI-powered emotional analytics
          from your journal entries.
        </p>

      </div>

      {/* BANNER */}
      <div style={moodBanner}>

        🌸 Emotional awareness helps
        improve mental wellness.

      </div>

      {/* SCORE CARDS */}
      <div style={scoreGrid}>

        <div style={scoreCard}>

          <h2 style={scoreTitle}>
            Mood Score
          </h2>

          <h1 style={scoreValue}>
            {moodScore}%
          </h1>

        </div>

        <div style={scoreCard}>

          <h2 style={scoreTitle}>
            Dominant Emotion
          </h2>

          <h1 style={scoreValue}>
            {dominantMood}
          </h1>

        </div>

      </div>

      {/* PIE CHART */}
      <div style={chartCard}>

        <h2 style={sectionTitle}>
          Emotional Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({
                name,
                percentage
              }) =>
                `${name} ${percentage}%`
              }
            >

              {data.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* LEGEND */}
      <div style={legendCard}>

        <h2 style={sectionTitle}>
          Emotion Colors
        </h2>

        <div style={legendGrid}>

          {[
            {
              color:
                "#ec4899",
              label:
                "Happy"
            },

            {
              color:
                "#3b82f6",
              label:
                "Sad"
            },

            {
              color:
                "#ef4444",
              label:
                "Angry"
            },

            {
              color:
                "#8b5cf6",
              label:
                "Calm"
            },

            {
              color:
                "#facc15",
              label:
                "Anxious"
            },

            {
              color:
                "#22c55e",
              label:
                "Relaxed"
            }

          ].map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                style={legendItem}
              >

                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background:
                      item.color
                  }}
                ></div>

                <p>
                  {item.label}
                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* WEEKLY GRAPH */}
      <div style={chartCard}>

        <h2 style={sectionTitle}>
          Weekly Mood Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={weeklyData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="mood"
              fill="#8b5cf6"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* AI ANALYSIS */}
      <div style={infoCard}>

        <h2
          style={{
            color: "#7c3aed"
          }}
        >
          AI Emotional Analysis
        </h2>

        <p style={infoText}>
          Your emotional wellness has
          improved by
          {" "}
          <strong>
            18%
          </strong>
          {" "}
          this week.
        </p>

        <p style={infoText}>
          Calm and positive emotions are
          becoming more frequent.
        </p>

        <p style={infoText}>
          Mild stress patterns were
          detected during mid-week.
        </p>

      </div>

      {/* WELLNESS */}
      <div style={infoCard}>

        <h2
          style={{
            color: "#7c3aed"
          }}
        >
          Wellness Suggestions
        </h2>

        <p style={infoText}>
          🌿 Continue journaling daily.
        </p>

        <p style={infoText}>
          🎵 Use relaxation exercises for
          anxiety reduction.
        </p>

        <p style={infoText}>
          💜 Maintain healthy sleep and
          mindfulness routines.
        </p>

      </div>

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

const moodBanner = {
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

const scoreGrid = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: 16,
  marginTop: 25
};

const scoreCard = {
  background:
    "linear-gradient(135deg, #ffffff, #ede9fe)",
  padding: 25,
  borderRadius: 28,
  textAlign: "center",
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.12)"
};

const scoreTitle = {
  color: "#7c3aed",
  marginBottom: 10
};

const scoreValue = {
  color: "#111827"
};

const chartCard = {
  marginTop: 30,
  background:
    "linear-gradient(135deg, #ffffff, #ede9fe)",
  padding: 25,
  borderRadius: 32,
  boxShadow:
    "0 12px 35px rgba(139,92,246,0.12)"
};

const sectionTitle = {
  color: "#7c3aed",
  marginBottom: 20
};

const legendCard = {
  marginTop: 25,
  background:
    "linear-gradient(135deg, #ffffff, #fdf2f8)",
  padding: 25,
  borderRadius: 30,
  boxShadow:
    "0 10px 30px rgba(236,72,153,0.1)"
};

const legendGrid = {
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: 14
};

const legendItem = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  background:
    "rgba(255,255,255,0.7)",
  padding: 14,
  borderRadius: 18
};

const infoCard = {
  marginTop: 20,
  background:
    "linear-gradient(135deg, #ffffff, #fdf2f8)",
  padding: 26,
  borderRadius: 30,
  boxShadow:
    "0 10px 30px rgba(236,72,153,0.1)"
};

const infoText = {
  lineHeight: 1.8,
  marginTop: 10,
  color: "#4b5563"
};

export default Insights;