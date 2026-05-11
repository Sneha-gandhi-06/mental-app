import React, {
  useState,
  useEffect
} from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Journal() {

  const [date, setDate] = useState(new Date());

  const [text, setText] = useState("");

  const [entries, setEntries] = useState({});

  // LOAD SAVED ENTRIES
  useEffect(() => {

    const savedEntries =
      JSON.parse(
        localStorage.getItem(
          "journalEntries"
        )
      ) || {};

    setEntries(savedEntries);

  }, []);

  const formattedDate =
    date.toDateString();

  // SAVE ENTRY
  const saveEntry = () => {

    const updatedEntries = {
      ...entries,
      [formattedDate]: text
    };

    setEntries(updatedEntries);

    localStorage.setItem(
      "journalEntries",
      JSON.stringify(updatedEntries)
    );

    alert(
      "Journal Entry Saved 💜"
    );
  };

  // DELETE ENTRY
  const deleteEntry = () => {

    const updated = {
      ...entries
    };

    delete updated[formattedDate];

    setEntries(updated);

    localStorage.setItem(
      "journalEntries",
      JSON.stringify(updated)
    );

    setText("");

    alert("Entry Deleted 🗑️");
  };

  // LOAD ENTRY WHEN DATE CHANGES
  const loadEntry = (
    selectedDate
  ) => {

    const formatted =
      selectedDate.toDateString();

    setDate(selectedDate);

    setText(
      entries[formatted] || ""
    );
  };

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

      {/* HEADER */}
      <div
        style={{
          marginBottom: 20
        }}
      >

        <h1
          style={{
            fontSize: 30,
            marginBottom: 5,
            color: "#7c3aed"
          }}
        >
          Journal Calendar 📅
        </h1>

        <p
          style={{
            color: "gray"
          }}
        >
          Track your emotions beautifully.
        </p>

      </div>

      {/* CALENDAR */}
      <div style={calendarCard}>

        <Calendar
          onChange={loadEntry}
          value={date}
        />

      </div>

      {/* DATE */}
      <h2
        style={{
          marginTop: 25,
          color: "#6d28d9"
        }}
      >
        {formattedDate}
      </h2>

      {/* TEXTAREA */}
      <textarea
        rows="6"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Write your thoughts..."
        style={textareaStyle}
      />

      {/* BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 15
        }}
      >

        <button
          onClick={saveEntry}
          style={saveBtn}
        >
          Save 💾
        </button>

        <button
          onClick={deleteEntry}
          style={deleteBtn}
        >
          Delete 🗑️
        </button>

      </div>

      {/* ENTRY CARD */}
      {entries[formattedDate] && (

        <div style={entryCard}>

          <h3>
            ✨ Saved Entry
          </h3>

          <p
            style={{
              lineHeight: 1.7,
              marginTop: 10
            }}
          >
            {
              entries[
                formattedDate
              ]
            }
          </p>

        </div>

      )}

    </div>
  );
}

const calendarCard = {
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",
  padding: 20,
  borderRadius: 30,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.15)"
};

const textareaStyle = {
  width: "100%",
  padding: 18,
  marginTop: 15,
  borderRadius: 24,
  border: "none",
  background: "#ffffff",
  outline: "none",
  resize: "none",
  fontSize: 15,
  boxSizing: "border-box",
  boxShadow:
    "0 6px 20px rgba(99,102,241,0.08)"
};

const saveBtn = {
  flex: 1,
  padding: 15,
  borderRadius: 20,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow:
    "0 8px 25px rgba(236,72,153,0.3)"
};

const deleteBtn = {
  flex: 1,
  padding: 15,
  borderRadius: 20,
  border: "none",
  background:
    "linear-gradient(135deg, #f43f5e, #fb7185)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow:
    "0 8px 25px rgba(244,63,94,0.3)"
};

const entryCard = {
  marginTop: 25,
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",
  padding: 22,
  borderRadius: 28,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.12)"
};

export default Journal;