require("dotenv").config();
const express=require("express");
const app=express();
const {chats} =require("./data/data.js");
const port=process.env.PORT || 5000
const connectDB=require("./Config/db.js");
const cors=require("cors");
const path=require("path");

//middelwars
const {urlnotFound, errorHandler} =require("./middlewares/errorMiddelware.js")

connectDB();

app.use(cors());
app.use(express.json());  //accept to json data
app.use(express.urlencoded({extended:true}));

//import Routes
const userRoutes=require("./Routes/userRoutes.js");
const chatRoutes=require("./Routes/chatRouts.js");
const messageRoutes=require("./Routes/messageRoutes.js");
//Routing use
app.use('/api/users',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes)

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/FrontEnd/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "FrontEnd", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

//Error handling using middelwares
app.use(urlnotFound) ;  //if Url not Found
app.use(errorHandler) ; //error

const server=app.listen(port,()=>{
    console.log(`${port} is live`);
})

const io=require('socket.io')(server,{
    pingTimeout: 60000,
    cors : {
        origin: "http://localhost:5000"
    }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});