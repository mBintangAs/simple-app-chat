const mongoose = require('mongoose'); const { Message } = require('./Message');
;

const { Schema } = mongoose;

const ChatSchema = new Schema({
    participants: { type: [mongoose.Schema.ObjectId], ref: 'User' },
    lastMessageId: { type: mongoose.Schema.ObjectId, ref: 'Message' },
    lastMessageDate: Date,
    message: { type: [mongoose.Schema.ObjectId], ref: 'Message' }
}, { timestamps: true });
const Chat = mongoose.model('Chat', ChatSchema);
module.exports = { Chat }
