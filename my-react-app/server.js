// webSocket Server.js
import express from"express";
import {createServer } from "http";
import { WebSocketServer } from"ws";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(3001, () => {
  console.log("WebSocket server running on ws://localhost:3001");
});
