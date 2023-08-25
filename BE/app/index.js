import express from "express";
import dotenv from "dotenv";
import Comment from "./models/comments.js";
import conncetDB from "../config/db.js";
import AuthenRouter from "./routers/auth.js";
import BlogRouter from "./routers/blog.js";
import CommentRouter from "./routers/comment.js";
import morga from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors: {origin: "*"}});

dotenv.config();

app.use(express.json());
app.use(morga("tiny"));
app.use(cors());
conncetDB(process.env.MONGO_URI);
io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("newComment", async (data) => {
    io.emit("newComment", await data);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
    // Xử lý khi client ngắt kết nối
  });
});


app.use("/api", AuthenRouter);
app.use("/api", BlogRouter);
app.use("/api", CommentRouter);

const PORT = process.env.PORT_VITE || "8000";

server.listen(PORT, () => {
  console.log("listening on http://localhost Port: ", PORT);
});
