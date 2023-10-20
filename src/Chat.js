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
  const [name, setName] = useState();
  console.log("messageList messageList", messageList);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
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
  }, [socket]);

  const deleteMsg = (id) => {
    setShowIcon(true);
    // alert(id)
    setID(id);
  };
  const deleteMessage =   () => {
    setShowIcon(false);
    // setID(id)
    sendMessage();
    messageList.splice(ID, 1);
    setMessageList([...messageList]);
  };

  const author = (n) => {
    setName(n);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        {/* <p>Live Chat&nbsp;&nbsp;&nbsp;{messageList.map((item)=>item.author).at(0)}</p> */}
        <p>
          Id : {room}&nbsp;&nbsp;&nbsp;Name : {username === name ? username : name}
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
              
              {/* author(messageContent.author)}   */}
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
                    <div
                      className="dele-msg"
                      onClick={deleteMessage}
                    >
                      delete
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
