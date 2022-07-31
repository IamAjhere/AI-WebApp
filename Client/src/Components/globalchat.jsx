import React, { useState, useEffect } from "react";
import ChatInput from "./chatinput";
import Skeleton from "react-loading-skeleton";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Message from "./message";
function GlobalChat({ Metal, socket }) {
  const [arrivalmsg, setArrivalmsg] = useState(null);
  const { auth } = useAuth();
  const [currentUser, setCurrentUser] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [isloading, setLoading] = useState(false);
  //get Now time
  function getNow() {
    let dates = new Date().toLocaleString("en-US");
    const splitsdate = dates.split(" ");
    dates = splitsdate[0].slice(0, -1);
    const times = splitsdate[1].slice(0, -3) + " " + splitsdate[2];
    return { dates, times };
  }

  useEffect(() => {
    setCurrentChat(Metal);
  }, [Metal]);

  useEffect(() => {
    setLoading(true);
    setCurrentUser(auth.accessToken);
    const fetchmsg = async () => {
      const response = await axios.post(
        "/allmessage",
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
    currentUser && fetchmsg();
  }, [currentChat, auth.accessToken, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(
      "/message",
      {
        to: currentChat,
        message: msg,
      },
      {
        headers: { "auth-token": currentUser },
        withCredentials: true,
      }
    );
    socket.current.emit("send-msg", {
      user: currentUser,
      to: currentChat,
      message: msg,
      time: getNow().times,
      date: getNow().dates,
    });
    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
      time: getNow().times,
      date: getNow().dates,
    });
    setMessages(msgs);
  };
  useEffect(() => {
    if (currentChat) {
      socket.current.on("msg-received", (msg, user, time, date) => {
        setArrivalmsg({
          fromSelf: false,
          message: msg,
          user: user,
          time: time,
          date: date,
        });
      });
    }
  }, [socket, currentChat]);

  useEffect(() => {
    arrivalmsg && setMessages((prev) => [...prev, arrivalmsg]);
  }, [arrivalmsg]);

  return (
    <>
      {isloading ? (
        <Skeleton height={670} />
      ) : (
        <>
          <Message messages={messages} />
          <ChatInput handleSendMsg={handleSendMsg} />
        </>
      )}
    </>
  );
}

export default GlobalChat;
