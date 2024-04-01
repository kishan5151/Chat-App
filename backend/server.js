require("dotenv").config();
const express=require("express");
const app=express();
const {chats} =require("./data/data.js");
const port=process.env.PORT || 5000
const connectDB=require("./Config/db.js");
const cors=require("cors");

//middelwars
const {urlnotFound, errorHandler} =require("./middlewares/errorMiddelware.js")

connectDB();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());  //accept to json data
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello I am Home page");
})

//import Routes
const userRouts=require("./Routes/userRoutes.js");
const chatRouts=require("./Routes/chatRouts.js");
//Routing use
app.use('/api/users',userRouts);
app.use('/api/chat',chatRouts);
//Error handling using middelwares
app.use(urlnotFound) ;  //if Url not Found
app.use(errorHandler) ; //error

app.listen(port,()=>{
    console.log(`${port} is live`);
})