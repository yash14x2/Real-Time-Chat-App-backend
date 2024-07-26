import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import userrouter from './routes/userroutes.js';
import databaseconnection from './db/databaseconnection.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

databaseconnection("mongodb+srv://yashjoshi1901:admin@chattyy.h3ugezr.mongodb.net/?retryWrites=true&w=majority&appName=Chattyy");

app.get("/", (req, res) => {
  res.send("hey its working");
});

app.use("/api/auth", userrouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

global.onlineusers = new Map();
io.on("connection", (socket) => {
  console.log('New connection:', socket.id);

  socket.on("add-user", (userid) => {
    onlineusers.set(userid, socket.id);
    console.log("User added:", userid, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log("this is data" , data)
    const sendUserSocket = onlineusers.get(data.to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-received", data);
    }
  });

  socket.on("disconnect", () => {
    onlineusers.forEach((value, key) => {
      if (value === socket.id) {
        onlineusers.delete(key);
      }
    });
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
