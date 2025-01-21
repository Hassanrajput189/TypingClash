import { app } from "./app.js";
import { Server } from "socket.io";
import http from "http";
import { setupSocket } from "./socket.js";
import { connectDB } from "./data/database.js";

const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173" ,"typing-clash-front-end.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Cookie"],
  },
});

connectDB();

setupSocket(io);
server.listen(port, () => {
  console.log(`Server woking in ${process.env.NODE_ENV} mode and port is ${port}`);
});
