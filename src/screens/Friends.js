import React, {
  useState,
  useEffect
} from "react";

function Friends() {

  const [connectedFriends,
    setConnectedFriends] =
    useState({});

  const [selectedChat,
    setSelectedChat] =
    useState(null);

  const [message,
    setMessage] =
    useState("");

  const [messages,
    setMessages] =
    useState({});

  const [typing,
    setTyping] =
    useState(false);

  // NOTIFICATIONS
  const addNotification = (
    title,
    message
  ) => {

    const existing =
      JSON.parse(
        localStorage.getItem(
          "notifications"
        )
      ) || [];

    const updated = [

      {
        title,
        message,
        time:
          new Date().toLocaleTimeString()
      },

      ...existing

    ];

    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

  };

  const friends = [

    {
      id: 1,
      name: "Sarah",
      mood: "Calm & Creative",
      interest:
        "Journaling + Relax Music",
      compatibility: "96%",
      online: true
    },

    {
      id: 2,
      name: "Maya",
      mood: "Anxiety Support",
      interest:
        "Meditation + Self Care",
      compatibility: "92%",
      online: false
    },

    {
      id: 3,
      name: "Alex",
      mood: "Positive Energy",
      interest:
        "Games + Motivation",
      compatibility: "88%",
      online: true
    }

  ];

  // LOAD SAVED DATA
  useEffect(() => {

    const savedConnections =
      JSON.parse(
        localStorage.getItem(
          "connections"
        )
      ) || {};

    const savedMessages =
      JSON.parse(
        localStorage.getItem(
          "messages"
        )
      ) || {};

    setConnectedFriends(
      savedConnections
    );

    setMessages(savedMessages);

  }, []);

  // CONNECT
  const connectFriend = (
    friend
  ) => {

    const updated = {
      ...connectedFriends,
      [friend.id]: true
    };

    setConnectedFriends(
      updated
    );

    localStorage.setItem(
      "connections",
      JSON.stringify(updated)
    );

    addNotification(
      "New Friend Connected",
      `${friend.name} connected with you.`
    );

  };

  // SEND MESSAGE
  const sendMessage = () => {

    if (!message.trim()) return;

    const updatedMessages = {
      ...messages
    };

    if (
      !updatedMessages[
        selectedChat.id
      ]
    ) {

      updatedMessages[
        selectedChat.id
      ] = [];

    }

    // USER MESSAGE
    updatedMessages[
      selectedChat.id
    ].push({

      sender: "you",

      text: message,

      time:
        new Date().toLocaleTimeString()

    });

    const lower =
      message.toLowerCase();

    let reply =
      "That makes sense honestly.";

    if (
      lower.includes("sad")
    ) {

      reply =
        "I'm really sorry you're feeling that way.";

    }

    else if (
      lower.includes("stress")
    ) {

      reply =
        "Try taking a small break maybe.";

    }

    else if (
      lower.includes("happy")
    ) {

      reply =
        "That genuinely made me smile.";

    }

    else if (
      lower.includes("lonely")
    ) {

      reply =
        "You're not alone okay?";

    }

    else if (
      lower.includes("tired")
    ) {

      reply =
        "You've probably been dealing with a lot lately.";

    }

    else {

      const randomReplies = [

        "I honestly relate to that.",

        "That sounds difficult.",

        "I'm glad you shared that.",

        "Take things slowly okay.",

        "You deserve rest too.",

        "I'm here for you."

      ];

      reply =
        randomReplies[
          Math.floor(
            Math.random() *
              randomReplies.length
          )
        ];

    }

    setTyping(true);

    setMessages(
      updatedMessages
    );

    setMessage("");

    // FRIEND REPLY
    setTimeout(() => {

      updatedMessages[
        selectedChat.id
      ].push({

        sender: "friend",

        text: reply,

        time:
          new Date().toLocaleTimeString()

      });

      setTyping(false);

      setMessages({
        ...updatedMessages
      });

      localStorage.setItem(
        "messages",
        JSON.stringify(
          updatedMessages
        )
      );

      addNotification(
        "New Message",
        `${selectedChat.name} replied to your message.`
      );

    }, 1200);

  };

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

      {/* BLOBS */}
      <div style={blob1}></div>
      <div style={blob2}></div>

      {/* HEADER */}
      <div style={headerCard}>

        <h1
          style={{
            fontSize: 32,
            color: "#7c3aed",
            marginBottom: 10
          }}
        >
          Friends
        </h1>

        <p
          style={{
            color: "gray",
            lineHeight: 1.7
          }}
        >
          Connect with emotionally
          compatible people.
        </p>

      </div>

      {/* FRIENDS */}
      <div style={{ marginTop: 30 }}>

        {friends.map(
          (friend) => (

            <div
              key={friend.id}
              style={friendCard}
            >

              {/* TOP */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15
                  }}
                >

                  <div style={avatar}>
                    {friend.name[0]}
                  </div>

                  <div>

                    <h2
                      style={{
                        color: "#7c3aed",
                        marginBottom: 5
                      }}
                    >
                      {friend.name}
                    </h2>

                    <p style={smallText}>
                      {friend.mood}
                    </p>

                  </div>

                </div>

                {/* ONLINE */}
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background:
                      friend.online
                        ? "#22c55e"
                        : "#9ca3af"
                  }}
                ></div>

              </div>

              {/* INFO */}
              <div
                style={{
                  marginTop: 20
                }}
              >

                <div style={infoBox}>
                  {friend.interest}
                </div>

                <div style={infoBox}>
                  Compatibility:
                  {" "}
                  {
                    friend.compatibility
                  }
                </div>

              </div>

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 20,
                  flexWrap: "wrap"
                }}
              >

                {!connectedFriends[
                  friend.id
                ] ? (

                  <button
                    style={connectBtn}
                    onClick={() =>
                      connectFriend(
                        friend
                      )
                    }
                  >
                    Connect
                  </button>

                ) : (

                  <button
                    style={
                      connectedBtn
                    }
                  >
                    Connected
                  </button>

                )}

                <button
                  style={messageBtn}
                  onClick={() =>
                    setSelectedChat(
                      friend
                    )
                  }
                >
                  Message
                </button>

                {/* DISCONNECT */}
                <button
                  style={disconnectBtn}

                  onClick={() => {

                    const updated = {
                      ...connectedFriends
                    };

                    delete updated[
                      friend.id
                    ];

                    setConnectedFriends(
                      updated
                    );

                    localStorage.setItem(
                      "connections",
                      JSON.stringify(updated)
                    );

                    addNotification(
                      "Friend Disconnected",
                      `${friend.name} disconnected.`
                    );

                  }}
                >
                  Disconnect
                </button>

                {/* BLOCK */}
                <button
                  style={blockBtn}

                  onClick={() => {

                    addNotification(
                      "Friend Blocked",
                      `${friend.name} was blocked.`
                    );

                  }}
                >
                  Block
                </button>

              </div>

            </div>

          )
        )}

      </div>

      {/* CHAT MODAL */}
      {selectedChat && (

        <div style={chatOverlay}>

          <div style={chatModal}>

            {/* HEADER */}
            <div style={chatHeader}>

              <div>

                <h2
                  style={{
                    color: "#7c3aed",
                    marginBottom: 5
                  }}
                >
                  {selectedChat.name}
                </h2>

                <p
                  style={{
                    color: "gray",
                    fontSize: 13
                  }}
                >
                  {selectedChat.online
                    ? "Online"
                    : "Offline"}
                </p>

              </div>

              <button
                style={closeBtn}
                onClick={() =>
                  setSelectedChat(
                    null
                  )
                }
              >
                ✖
              </button>

            </div>

            {/* CHAT AREA */}
            <div style={chatArea}>

              {(messages[
                selectedChat.id
              ] || []).map(
                (
                  msg,
                  index
                ) => (

                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.sender ===
                        "you"
                          ? "flex-end"
                          : "flex-start"
                    }}
                  >

                    <div
                      style={
                        msg.sender ===
                        "you"
                          ? yourMsg
                          : friendMsg
                      }
                    >

                      {msg.text}

                      <p
                        style={{
                          fontSize: 11,
                          opacity: 0.7,
                          marginTop: 6
                        }}
                      >
                        {msg.time}
                      </p>

                    </div>

                  </div>

                )
              )}

              {/* TYPING */}
              {typing && (

                <p
                  style={{
                    color: "gray",
                    fontStyle: "italic",
                    marginTop: 10
                  }}
                >
                  typing...
                </p>

              )}

            </div>

            {/* INPUT */}
            <div style={inputRow}>

              <input
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                placeholder="Type message..."
                style={chatInput}
              />

              <button
                onClick={
                  sendMessage
                }
                style={sendBtn}
              >
                Send
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

/* STYLES */

const headerCard = {
  background:
    "rgba(255,255,255,0.6)",
  backdropFilter: "blur(18px)",
  padding: 30,
  borderRadius: 35,
  boxShadow:
    "0 15px 40px rgba(139,92,246,0.15)"
};

const friendCard = {
  marginTop: 20,
  background:
    "rgba(255,255,255,0.6)",
  backdropFilter: "blur(18px)",
  padding: 25,
  borderRadius: 32,
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.1)"
};

const avatar = {
  width: 65,
  height: 65,
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: 28,
  fontWeight: "bold"
};

const smallText = {
  color: "gray"
};

const infoBox = {
  marginTop: 10,
  padding: 14,
  borderRadius: 18,
  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)"
};

const connectBtn = {
  flex: 1,
  padding: 15,
  borderRadius: 22,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const connectedBtn = {
  flex: 1,
  padding: 15,
  borderRadius: 22,
  border: "none",
  background:
    "linear-gradient(135deg, #22c55e, #4ade80)",
  color: "white",
  fontWeight: "bold"
};

const messageBtn = {
  flex: 1,
  padding: 15,
  borderRadius: 22,
  border: "none",
  background:
    "linear-gradient(135deg, #ddd6fe, #fbcfe8)",
  color: "#6d28d9",
  fontWeight: "bold",
  cursor: "pointer"
};

const disconnectBtn = {
  padding: 12,
  borderRadius: 18,
  border: "none",
  background:
    "linear-gradient(135deg, #f59e0b, #f97316)",
  color: "white",
  cursor: "pointer"
};

const blockBtn = {
  padding: 12,
  borderRadius: 18,
  border: "none",
  background:
    "linear-gradient(135deg, #ef4444, #f43f5e)",
  color: "white",
  cursor: "pointer"
};

const chatOverlay = {
  position: "fixed",
  inset: 0,
  background:
    "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999
};

const chatModal = {
  width: "90%",
  maxWidth: 420,
  height: "75vh",
  background: "white",
  borderRadius: 32,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
};

const chatHeader = {
  padding: 20,
  borderBottom:
    "1px solid #eee",
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center"
};

const closeBtn = {
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer"
};

const chatArea = {
  flex: 1,
  padding: 20,
  overflowY: "auto",
  background:
    "linear-gradient(180deg, #faf5ff, #fdf2f8)"
};

const yourMsg = {
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  padding: 12,
  borderRadius: 18,
  marginBottom: 10,
  maxWidth: "70%"
};

const friendMsg = {
  background: "white",
  padding: 12,
  borderRadius: 18,
  marginBottom: 10,
  maxWidth: "70%"
};

const inputRow = {
  display: "flex",
  gap: 10,
  padding: 15,
  borderTop:
    "1px solid #eee"
};

const chatInput = {
  flex: 1,
  padding: 14,
  borderRadius: 18,
  border: "none",
  background: "#f3f4f6",
  outline: "none"
};

const sendBtn = {
  padding: "14px 18px",
  borderRadius: 18,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  cursor: "pointer"
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

export default Friends;