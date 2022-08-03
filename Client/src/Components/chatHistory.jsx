import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import axios from "../api/axios";
function ChatHistory() {
  //
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState("Gold");
  const [isloading, setLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchmsg = async () => {
      const response = await axios.post(
        "/messagehistory",
        {
          to: currentChat,
        },
        {
          headers: { "auth-token": auth.accessToken },
          withCredentials: true,
        }
      );
      setMessages(response.data);
      setLoading(false);
    };
    auth.accessToken && fetchmsg();
  }, [currentChat, auth.accessToken]);

  return (
    <>
      <div className="card">
        <div className="card-header d-flex text-center">
          Chat History
          <select
            className="form-select"
            name="metals"
            id="metals"
            onChange={(e) => setCurrentChat(e.target.value)}
          >
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
        <div className="card-body chat-block d-flex flex-column">
          <div className="flex-grow-1 border h-75 overflow-auto" id="chat">
            <div className="chat-message">
              {isloading ? (
                <Skeleton height={670} />
              ) : (
                <>
                  {messages.map((message, i) => (
                    <div
                      className={`message  ${
                        message.fromSelf ? "send" : "recive"
                      }`}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHistory;
