import React, { useEffect, useRef, useState } from 'react';

const socket = new WebSocket('ws://localhost:3001');

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.send(input);
      setInput('');
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">💬 WebSocket Chat</h1>
      <div className="border h-64 overflow-y-auto p-2 mb-4 bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">{msg}</div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <input
        className="border p-2 w-full mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default App;
