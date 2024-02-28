const  mongoose = require('mongoose');;

const { Schema } = mongoose;

const MessageSchema = new Schema({
    conversationId: {type:mongoose.Schema.ObjectId,ref:'Chat'},
    senderId: {type:mongoose.Schema.ObjectId,ref:'User'},
    text: String,
});

const Message = mongoose.model('User', MessageSchema);
module.exports = Message
