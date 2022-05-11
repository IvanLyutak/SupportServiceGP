import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

import './Chat.css'

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false);
  }, [msg]);
  return (
    <div
      className={`message_wrapper ${msg.fromId === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.fromId === user1 ? "me" : "friend"}>
        {msg.text}
        <br />
        <small>
          <Moment format="HH:mm D MMM YYYY" unix>{msg.timestamp}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;