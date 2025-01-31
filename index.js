require('dotenv').config()
const express = require('express')
const app = express()
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser')
const cors = require('cors')

const AuthRouter = require('./Router/AuthRoutes')
const ProductRouter = require('./Router/ProductRoutes')
const PostRouter = require('./Router/PostRoutes')
const ProfileRouter = require('./Router/ProfileRoutes')
const MessageRouter = require('./Router/MessageRoutes')
require('./Models/db')

const PORT = process.env.PORT || 8080;

app.get('/ping' , (req,res) => {
    res.send(`PONG ${res}`)
})

const server = http.createServer(app)
const io = socketIo(server, { cors: { origin: '*' } }) //for omit cors error



app.use(bodyParser.json())
app.use(cors())
app.use('/auth' , AuthRouter)
app.use('/products' , ProductRouter)
app.use('/post' , PostRouter)
app.use('/user' , ProfileRouter)
app.use('/message' , MessageRouter)



// Socket.io connection
io.on("connection", (socket) => {
    console.log("A user connected");
  
    // Send "Hello World" to the client when connected
    // socket.emit("message", "Hello World test fry tere");
  
    // Listen for a message from the client
    socket.on("sendMessage", (message) => {
      io.emit('message', message);
      
    });
  
    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

server.listen(PORT , () => {
    console.log(`Server Listening at ${PORT}`);
    
})



