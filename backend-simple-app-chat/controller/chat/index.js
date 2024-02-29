const { Chat } = require("../../model/Chat");
const { User } = require("../../model/User");


const index = async (req, res) => {
    try {
        const { _id } = req.user
        const chat = await Chat.find({ participants: { $in: [_id] } }).populate(
            [
                {
                    path: "participants",
                    select: "username", // Jika Anda hanya ingin menampilkan username dari participants
                    options: { strictPopulate: false }
                },
                {
                    path: "lastMessageId",
                    select: "text", // Jika Anda hanya ingin menampilkan username dari participants
                    options: { strictPopulate: false }
                }
            ]
        );

        return res.json(chat)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

}
const store = async (req, res) => {
    try {
        const { _id } = req.user;
        const { username } = req.body;
        const user = await User.findOne({ username })
        if (user.length < 1 || user._id == _id) {
            return res.json({ code: 404, message: 'Pengguna tidak ditemukan' })
        }
        const chatExist = await Chat.findOne({ participants: { $in: [_id, user._id] } })
        if (chatExist) {
            return res.json(chatExist._id)
        }
        const chat = await Chat.create({ participants: [_id, user._id] })
        return res.json(chat._id)
    } catch (error) {
        return res.status(500).json(error)
    }
}
module.exports = { index, store }    