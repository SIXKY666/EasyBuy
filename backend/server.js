const express = require("express");;
const http = require("http");
const dotenv = require('dotenv');
const cors = require("cors");
const morgan = require('morgan')
const socketIo = require('socket.io');

const app = express()
app.use(express.json());
const corsOptions = {
  origin: '*',
  credentials: true,           
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
dotenv.config();
app.use(morgan('dev'))

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/product", require("./routes/product.routes"));

const server = http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// io.on('connection', client => {
//   const sessionID = client.id;
//   console.log(`user:${sessionID} has connected`)

//   client.on('disconnect', () => {
//     console.log('user disconnected')
//   })

//   client.on("join_room", (roomName) => {
//     console.log(`${sessionID} joined ${roomName}`);
//     client.join(roomName);
//   });

//   client.on('sent-message', function (message) {
//     console.log(`${sessionID} sent: ${message}`);
//     io.sockets.to(message.room).emit("new-message", message);
//     // io.sockets.emit('new-message', message)
//   })
// })

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("join_room", (roomName) => {
    console.log(`user joined ${roomName}`);
    socket.join(roomName);
  });

  socket.on('new-product', (update) => {
    console.log('new-product', update.name);
    console.log("update on room", update.room);
    io.to(update.room).emit('product-list', { status: true });
    // io.emit('product-list', { status: true });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
server.listen(process.env.PORT, () => {
  console.log("SERVER IS RUNNING ON", process.env.PORT);
});
