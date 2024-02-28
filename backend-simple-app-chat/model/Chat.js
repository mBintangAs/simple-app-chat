const  mongoose = require('mongoose');;

const { Schema } = mongoose;

const ChatSchema = new Schema({
    participants: { type:[mongoose.Schema.ObjectId],ref:'User' },
    lastMessageId: { type:mongoose.Schema.ObjectId,ref:'Message' },
    lastMessageDate: Date,
});

const Chat = mongoose.model('User', ChatSchema);
module.exports = Chat
