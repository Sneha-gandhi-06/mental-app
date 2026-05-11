import React, {
  useState,
  useEffect,
  useRef
} from "react";

import axios from "axios";

function Chat() {
  const [messages,
  setMessages] =
  useState([]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);
  // FETCH CHAT HISTORY
useEffect(() => {

  fetchChats();

}, []);

const fetchChats =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(

          "http://localhost:5000/api/chat/history",

          {
            headers: {

              authorization:
                token

            }
          }

        );

      const formattedChats =
        response.data.map(
          (chat) => ({

            text:
              chat.message,

            sender:
              chat.sender

          })
        );

      // DEFAULT MESSAGE
      if (
        formattedChats.length === 0
      ) {

        formattedChats.push({

          text:
            "Hey 💜 I'm here for you. How are you feeling today?",

          sender:
            "bot"

        });

      }

      setMessages(
        formattedChats
      );

    }

    catch (error) {

      console.log(error);

    }

  };
  const sendMessage =
  async () => {

    if (!input) return;

    const userMessage = {

      text: input,

      sender: "user"

    };

    setMessages((prev) => [

      ...prev,

      userMessage

    ]);

    const currentInput =
      input;

    setInput("");

    setTyping(true);

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      // SAVE USER MESSAGE
      await axios.post(

        "http://localhost:5000/api/chat/save",

        {

          sender:
            "user",

          message:
            currentInput

        },

        {
          headers: {

            authorization:
              token

          }
        }

      );

      setTimeout(
        async () => {

          const reply =
            generateReply(
              currentInput
            );

          const botMessage = {

            text:
              reply,

            sender:
              "bot"

          };

          setMessages((prev) => [

            ...prev,

            botMessage

          ]);

          // SAVE BOT MESSAGE
          await axios.post(

            "http://localhost:5000/api/chat/save",

            {

              sender:
                "bot",

              message:
                reply

            },

            {
              headers: {

                authorization:
                  token

              }
            }

          );

          setTyping(false);

        },

        1500
      );

    }

    catch (error) {

      console.log(error);

      setTyping(false);

    }

  };

  const generateReply = (message) => {
    const text = message.toLowerCase();

    if (
      text.includes("sad") ||
      text.includes("depressed")
    ) {
      return "I'm really sorry you're feeling this way 💜 You don’t have to handle everything alone.";
    }

    if (
      text.includes("stress") ||
      text.includes("anxiety")
    ) {
      return "Take a deep breath 🌿 You're carrying a lot right now, and it's okay to pause.";
    }

    if (
      text.includes("angry") ||
      text.includes("frustrated")
    ) {
      return "Your emotions are valid 💜 Try slowing down for a moment and grounding yourself.";
    }

    if (
      text.includes("happy") ||
      text.includes("good")
    ) {
      return "That makes me so happy to hear 😊 Hold onto this feeling today.";
    }

    if (
      text.includes("alone") ||
      text.includes("lonely")
    ) {
      return "Even if it feels lonely right now, you are still deeply important 💜";
    }

    return "I'm listening 💜 Tell me more about what’s on your mind.";
  };

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, typing]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        fontFamily: "system-ui",
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
          AI Companion 🤖
        </h1>

        <p style={{ color: "gray" }}>
          Your safe emotional space.
        </p>
      </div>

      {/* CHAT AREA */}
      <div
        style={{
          marginTop: 25,
          paddingBottom: 120
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: 15
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: 16,
                borderRadius: 24,
                background:
                  msg.sender === "user"
                    ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                    : "#ffffff",
                color:
                  msg.sender === "user"
                    ? "white"
                    : "#111827",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.06)",
                lineHeight: 1.5
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* TYPING */}
        {typing && (
          <div style={{ marginBottom: 15 }}>
            <div style={typingStyle}>
              Typing...
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT BAR */}
      <div style={inputContainer}>
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Talk to your AI companion..."
          style={inputStyle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          style={sendBtn}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const headerCard = {
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",
  padding: 24,
  borderRadius: 30,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.12)"
};

const typingStyle = {
  display: "inline-block",
  padding: 14,
  borderRadius: 20,
  background: "#ffffff",
  color: "gray",
  boxShadow:
    "0 8px 25px rgba(0,0,0,0.05)"
};

const inputContainer = {
  position: "fixed",
  bottom: 80,
  left: 15,
  right: 15,
  display: "flex",
  gap: 10
};

const inputStyle = {
  flex: 1,
  padding: 16,
  borderRadius: 24,
  border: "none",
  outline: "none",
  background: "#ffffff",
  boxShadow:
    "0 6px 20px rgba(99,102,241,0.08)",
  fontSize: 15
};

const sendBtn = {
  padding: "0 24px",
  borderRadius: 24,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow:
    "0 8px 25px rgba(236,72,153,0.3)"
};

export default Chat;