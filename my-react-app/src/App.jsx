import React, { useEffect, useRef } from 'react';
import ChatBox from './components/ChatBox';
import MessageInput from './components/MessageInput';
import './App.css';

function App() {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8080"); // use your ws server URL
  }, []);

  return (
    <div className="app">
      <h1>Real-time Chat App</h1>
      {socket.current && (
        <>
          <ChatBox socket={socket.current} />
          <MessageInput socket={socket.current} />
        </>
      )}
    </div>
  );
}

export default App;
