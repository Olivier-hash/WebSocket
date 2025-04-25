import React, { useState } from 'react';

function MessageInput({ socket }) {
  const [message, setMessage] = useState('');

  const send = () => {
    if (message.trim()) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div className="input-container">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={send}>Send</button>
    </div>
  );
}

export default MessageInput;
