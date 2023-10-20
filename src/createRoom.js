import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(null);
  const [valid, setValid] = useState(null);

  const joinRoom = () => {
    setValid(false);
    if (username !== "") {
      if (room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
        setValid(true);
      }
    } else {
      setValid(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Can We Chat</h3>
          <input
            type="text"
            placeholder="Name*"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          {valid === true ? "please fill name " : ""}
          <input
            type="text"
            placeholder="Room ID*"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          {valid === false ? "please enter room id" : ""}
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          newChat={setShowChat}
          room={room}
        />
      )}
    </div>
  );
}

export default App;
