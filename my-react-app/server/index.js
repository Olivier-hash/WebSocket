const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const PORT = 3001;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let sockets = [];

wss.on('connection', (socket) => {
  sockets.push(socket);
  console.log('🔌 Client connected');

  socket.on('message', (msg) => {
    console.log('📩 Received:', msg);
    // Broadcast to all clients
    sockets.forEach((s) => {
      if (s.readyState === WebSocket.OPEN) {
        s.send(msg);
      }
    });
  });

  socket.on('close', () => {
    sockets = sockets.filter((s) => s !== socket);
    console.log('❌ Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
