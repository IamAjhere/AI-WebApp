import React, { useState } from "react";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
      document.getElementById("inputBox").value = "";
    }
  };

  return (
    <div className="flex-shrink-1 ">
      <form onSubmit={sendChat}>
        <div className="input-group">
          <input
            id="inputBox"
            autoComplete="off"
            type="text"
            className="form-control chat_input"
            placeholder="Write your message here..."
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <span className="input-group-btn">
            <button className="btn btn-primary h-100" type="submit">
              Send
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
