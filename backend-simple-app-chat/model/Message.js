const mongoose = require('mongoose');;

const { Schema } = mongoose;

const MessageSchema = new Schema({
    chatId: { type: mongoose.Schema.ObjectId, ref: 'Chat' },
    senderId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    text: String,
},{timestamps:true});

const Message = mongoose.model('Message', MessageSchema);
module.exports = { Message }
