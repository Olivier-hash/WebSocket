import React, { useEffect, useState } from 'react';

function ChatBox({ socket }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  }, [socket]);

  return (
    <div className="chat-box">
      {messages.map((msg, i) => (
        <div key={i} className="message">{msg}</div>
      ))}
    </div>
  );
}

export default ChatBox;
