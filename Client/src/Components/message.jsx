import React, { useEffect } from "react";

function Message({ messages }) {
  useEffect(() => {
    updateScroll();
  }, [messages]);

  function updateScroll() {
    var element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
  }
  return (
    <div className="flex-grow-1 border h-75 overflow-auto" id="chat">
      <div className="chat-message">
        {messages.map((message, i) => (
          <div
            className={`message  ${message.fromSelf ? "send" : "recive"}`}
            title={message.date}
            key={i}
          >
            <div className="flex-shrink-1 bg-light rounded py-2 px-3 m-2">
              <div>
                <div className="text-muted small text-nowrap mt-2">
                  {message.time}
                </div>
              </div>
              <div className="font-weight-bold mb-1">{`${
                message.fromSelf ? "You" : message.user
              }`}</div>
              {message.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Message;
