const { HashPassword, JwtSign, ComparePasswords } = require("../../utils/auth");
const { User } = require('../../model/User.js');
const { validationResult } = require('express-validator');
const index = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json(result.errors);
        }
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(500).json('Username tidak di temukan')
        }
        if (await ComparePasswords(password, user.password)) {
            const token = await JwtSign(user)
            return res.json({ _id: user._id, username ,token })
        }
        return res.status(500).json('Username / Password salah')
    } catch (error) {
        return res.status(500).json({ error })
    }
}
const store = async (req, res) => {
    try {
        const { username, password } = req.body
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json(result.errors);
        }
        const user = await User.create({ username, password: await HashPassword(password) })
        return res.json(user.username)
    } catch (error) {
        console.log(error);
        return res.json(error).status(500)
    }

}
module.exports = { index, store }