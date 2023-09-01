import express, {Express} from 'express';
import {connection} from './src/config/db';
import routerBlog from './src/routes/blog';
import routerUser from './src/routes/user';
import routerCmt from './src/routes/comment';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from "socket.io";



const app = express();
// const server = http.createServer(app);
// const io = new Server(server,{cors: {origin: "*"}});

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())



connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// io.on("connection", (socket) => {
//     console.log("A client connected");
  
//     socket.on("newComment", async (data) => {
//       io.emit("newComment", await data);
//     });
  
//     socket.on("disconnect", () => {
//       console.log("A client disconnected");
//       // Xử lý khi client ngắt kết nối
//     });
//   });

app.use('/api', routerBlog)
app.use('/api', routerUser)
app.use('/api', routerCmt)




export const viteNodeApp: any = app;
