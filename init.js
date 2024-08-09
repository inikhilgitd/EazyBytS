const mongoose = require('mongoose');
const Chat = require("./models/chat.js")



main()
.then(() => {
    console.log("Connection is succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Facebook');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}




let allChats = [
    {
        from:"nikhil",
        to: "chaubey",
        message: "how are you",
        created_at: new Date()
    },
    {
        from:"raju",
        to: "shivam",
        message: "Where are You",
        created_at: new Date()
    },
  
    {
        from:"udit",
        to: "ansh",
        message: "Nothing Playing Game",
        created_at: new Date()
    },
    {
        from:"patel",
        to: "kamal",
        message: "Lets Drink",
        created_at: new Date()
    },
]


Chat.insertMany (allChats);


