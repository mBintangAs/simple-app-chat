const { Chat } = require("../../model/Chat");
const { Message } = require("../../model/Message");


const index = async (req, res) => {
    try {
        const { _id } = req.body;
        const message = await Message.find({ chatId:_id })
        return res.json(message)
    } catch (error) {
        return res.status(500).json(error)
    }

}
const store = async (req, res) => {
    try {
        const { chatId, text } = req.body;
        const senderId = req.user._id
        const message = await Message.create({ chatId, senderId, text })
        
        const chat = await Chat.updateOne({ _id: chatId }, { $push: { message: message._id }, lastMessageId: message._id, lastMessageDate: message.createdAt })
        return res.json(message)
    } catch (error) {
        return res.status(500).json(error)
    }

}
module.exports = { store, index }