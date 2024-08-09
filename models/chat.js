const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: {
        type:String,
        require:true,
    },
    to: {
        type:String,
        reuired:true,
    },
    message: {
        type:String,
        maxLength:80,
    },
    created_at: {
        type:Date,
        reuired:true,
    },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports= Chat