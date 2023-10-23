/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// import AnotherUser from "./anotherUser";

function Chat({ socket, username, room, newChat }) {
  console.log(" username, room ", username, room);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [ID, setID] = useState(null);
  const [showIcon, setShowIcon] = useState(false);
  // const [name, setName] = useState();
  

  const msgLength = messageList.length !== messageList;

  const sendMessage = async () => {
    setShowIcon(false);
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getDate() +
          ":" +
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket, msgLength]);

  const deleteMsg = (id) => {
    setShowIcon(true);
    setID(id);
  };
  const deleteMessage = () => {
    setShowIcon(false);
    sendMessage();
    messageList.splice(ID, 1);
    setMessageList([...messageList]);
  };
  const editMsg = (id) => {
    setCurrentMessage(messageList[id].message);
  };

  const firstNonEmptyAuthor = messageList.find(
    (item) => item.author !== username
  )?.author;

  const usernameToUse =
    username !== firstNonEmptyAuthor ? firstNonEmptyAuthor : username;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>
          {" "}
          Id : {room}&nbsp;&nbsp;&nbsp;Name :{" "}
          {usernameToUse === username ? username : firstNonEmptyAuthor}
        </p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, idx) => {
            return (
              <div
                className="message"
                id={username !== messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                    {username !== messageContent.author ? (
                      ""
                    ) : (
                      <img
                        className="img"
                        src="dots.png"
                        onClick={() => deleteMsg(idx)}
                        width={10}
                      />
                    )}
                  </div>
                  {showIcon === true && ID === idx ? (
                    <div className="dele-msg" onClick={deleteMessage}>
                      <p> delete</p>
                      <p onClick={() => editMsg(idx)}>edit</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">
                      {username !== messageContent.author
                        ? messageContent.author
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button
          className="send-btn"
          style={{ backgroundColor: "#57ef7d" }}
          onClick={sendMessage}
        >
          &#9658;
        </button>
      </div>
      {/* <button> <AnotherUser messageList={messageList} /></button> */}
    </div>
  );
}

export default Chat;
