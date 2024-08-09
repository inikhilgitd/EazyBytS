const express = require("express");
const app = express();
const path = require("path");

const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");


main()
.then(() => {
    console.log("Connection is succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Facebook');


}

app.set("view engine",  "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));








app.get("/chats" , async(req,res) => {
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
})

app.get("/chats/new", (req,res) => {
    res.render("new.ejs")
})

app.post("/chats", (req,res) => {
    let {from, to, msg} = req.body;
    let newChats = new Chat({
        from:from,
        to:to,
        message:msg,
        created_at:new Date(),
    })
    newChats.save().then(res => {console.log("chats was saved")})
    .catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
})
//edit route
app.get("/chats/:id/edits", async(req,res) =>  {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" ,{chat})
})
//update route
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    console.log(newMsg)
    let updatedChat =  await Chat.findByIdAndUpdate(id, {message:newMsg}, {runValidators:true ,new:true } )
    res.redirect("/chats")
})

//destroy route
 app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    console.log(req.params)
   let deltedChat =await Chat.findByIdAndDelete(id);
    
   console.log(deltedChat);
   res.redirect("/chats");
 })

 app.get("/", (req,res) => {
    res.send("server is taking response");
})


app.listen(8080, () => {
    console.log("server is listening")
})