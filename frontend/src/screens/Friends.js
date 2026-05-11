import { io }
  from "socket.io-client";

import React, {
  useState,
  useEffect,
  useRef
} from "react";

import axios from "axios";

function Friends() {

  const socketRef =
    useRef(null);

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

  const [users,
    setUsers] =
    useState([]);

  const [requests,
    setRequests] =
    useState([]);

  const [friends,
    setFriends] =
    useState([]);
// LOAD SAVED MESSAGES
useEffect(() => {

  const savedMessages =
    JSON.parse(

      localStorage.getItem(
        "messages"
      )

    ) || {};

  setMessages(
    savedMessages
  );

}, []);
  // INITIALIZE SOCKET
  useEffect(() => {

    socketRef.current =
      io(
        "http://localhost:5000"
      );

    return () => {

      socketRef.current.disconnect();

    };

  }, []);

  // SOCKET RECEIVE
  useEffect(() => {

    if (!socketRef.current)
      return;

    socketRef.current.on(

      "receive_message",

      (data) => {

        setMessages(
          (prev) => {

            const updated = {
              ...prev
            };

            if (
              !updated[
                data.chatId
              ]
            ) {

              updated[
                data.chatId
              ] = [];

            }

            const alreadyExists =
              updated[
                data.chatId
              ].some(

                (msg) =>

                  msg.time ===
                  data.time &&

                  msg.text ===
                  data.text

              );

            if (!alreadyExists) {

              updated[
                data.chatId
              ].push(data);

            }

            return updated;

          }
        );

      }

    );

    socketRef.current.on(

      "typing",

      () => {

        setTyping(true);

        setTimeout(() => {

          setTyping(false);

        }, 1200);

      }

    );

    return () => {

      socketRef.current.off(
        "receive_message"
      );

      socketRef.current.off(
        "typing"
      );

    };

  }, []);

  // FETCH DATA
  useEffect(() => {

    fetchUsers();

    fetchRequests();

    fetchFriends();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(

            "http://localhost:5000/api/friends/users",

            {
              headers: {

                authorization:
                  token

              }
            }

          );

        setUsers(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const fetchRequests =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(

            "http://localhost:5000/api/friends/requests",

            {
              headers: {

                authorization:
                  token

              }
            }

          );

        setRequests(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const fetchFriends =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(

            "http://localhost:5000/api/friends/my-friends",

            {
              headers: {

                authorization:
                  token

              }
            }

          );

        setFriends(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // SEND FRIEND REQUEST
  const sendFriendRequest =
    async (userId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "http://localhost:5000/api/friends/send-request",

          {
            receiverId:
              userId
          },

          {
            headers: {

              authorization:
                token

            }
          }

        );

        alert(
          "Friend request sent"
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ACCEPT REQUEST
  const acceptRequest =
    async (requestId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "http://localhost:5000/api/friends/accept-request",

          {
            requestId
          },

          {
            headers: {

              authorization:
                token

            }
          }

        );

        fetchRequests();

        fetchFriends();

        alert(
          "Friend request accepted"
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // SEND MESSAGE
  const sendMessage = () => {

    if (!message.trim())
      return;

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

    const newMessage = {

      sender: "you",

      text: message,

      time:
        new Date()
          .toLocaleTimeString()

    };

    updatedMessages[
      selectedChat.id
    ].push(
      newMessage
    );

    setMessages(
      updatedMessages
    );
    localStorage.setItem(

  "messages",

  JSON.stringify(
    updatedMessages
  )

);

    socketRef.current.emit(

      "send_message",

      {

        chatId:
          selectedChat.id,

        sender:
          "you",

        text:
          message,

        time:
          newMessage.time

      }

    );

    socketRef.current.emit(
      "typing"
    );

    setMessage("");

  };

  return (

    <div
      style={{
        padding: 20,
        paddingBottom: 120,
        minHeight: "100vh",
        fontFamily: "system-ui",
        background:
          "linear-gradient(180deg, #fdf2f8, #eef2ff)"
      }}
    >

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
            color: "gray"
          }}
        >
          Connect and chat with friends.
        </p>

      </div>

      {/* DISCOVER USERS */}
      <div style={{ marginTop: 30 }}>

        <h2
          style={{
            color: "#7c3aed",
            marginBottom: 20
          }}
        >
          Discover Users
        </h2>

        {users
          .filter(

            (user) =>

              !friends.some(

                (friend) =>

                  friend._id ===
                  user._id

              )

          )

          .map((user) => (

            <div
              key={user._id}
              style={friendCard}
            >

              <h3
                style={{
                  color: "#7c3aed"
                }}
              >
                {user.username}
              </h3>

              <p
                style={{
                  color: "gray"
                }}
              >
                {user.email}
              </p>

              <button
                style={{
                  ...connectBtn,
                  marginTop: 15
                }}

                onClick={() =>
                  sendFriendRequest(
                    user._id
                  )
                }
              >
                Send Friend Request
              </button>

            </div>

          ))}

      </div>

      {/* MY FRIENDS */}
      <div style={{ marginTop: 35 }}>

        <h2
          style={{
            color: "#7c3aed",
            marginBottom: 20
          }}
        >
          My Friends
        </h2>

        {friends.map((friend) => (

          <div
            key={friend._id}
            style={friendCard}
          >

            <h3
              style={{
                color: "#7c3aed"
              }}
            >
              {friend.username}
            </h3>

            <p
              style={{
                color: "gray"
              }}
            >
              {friend.email}
            </p>

            <p
              style={{
                marginTop: 10,
                color: "#10b981",
                fontWeight: "bold"
              }}
            >
              Connected 💜
            </p>

            <button

              style={{
                ...messageBtn,
                marginTop: 15
              }}

              onClick={() => {

                const currentUser =
                  localStorage.getItem(
                    "userId"
                  );

                const roomId =
                  [currentUser, friend._id]
                    .sort()
                    .join("_");

                setSelectedChat({

                  id: roomId,

                  friendId:
                    friend._id,

                  name:
                    friend.username,

                  online: true

                });

              }}

            >
              Message
            </button>

          </div>

        ))}

      </div>

      {/* FRIEND REQUESTS */}
      <div style={{ marginTop: 35 }}>

        <h2
          style={{
            color: "#7c3aed",
            marginBottom: 20
          }}
        >
          Friend Requests
        </h2>

        {requests.map((request) => (

          <div
            key={request._id}
            style={friendCard}
          >

            <h3
              style={{
                color: "#7c3aed"
              }}
            >
              {request.sender.username}
            </h3>

            <p
              style={{
                color: "gray"
              }}
            >
              wants to connect
            </p>

            <button
              style={{
                ...connectBtn,
                marginTop: 15
              }}

              onClick={() =>
                acceptRequest(
                  request._id
                )
              }
            >
              Accept Request
            </button>

          </div>

        ))}

      </div>

      {/* CHAT MODAL */}
      {selectedChat && (

        <div style={chatOverlay}>

          <div style={chatModal}>

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
                  Online
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

const connectBtn = {
  padding: 15,
  borderRadius: 22,
  border: "none",
  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const messageBtn = {
  padding: 15,
  borderRadius: 22,
  border: "none",
  background:
    "linear-gradient(135deg, #ddd6fe, #fbcfe8)",
  color: "#6d28d9",
  fontWeight: "bold",
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

export default Friends;