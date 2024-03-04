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
        if (username == req.user.username) {
            return res.json({ code: 404, message: 'Tidak bisa menambahkan anda sendiri' })
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ code: 404, message: 'Pengguna tidak ditemukan' })
        }
        const chatExist = await Chat.findOne({ participants: { $in: [_id, user._id] } })
        if (chatExist) {
            return res.json({ code: 404, message: 'Pengguna sudah ditambahkan' })
        }
        const chat = await Chat.create({ participants: [_id, user._id] })

        return res.json(chat._id)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
const show = async (req, res) => {
    try {
        const { id } = req.params
        const chat = await Chat.findOne({ _id: id }).populate({
            path: "message",
            options: { strictPopulate: false }
        })
        return res.json(chat)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
module.exports = { index, store, show }    