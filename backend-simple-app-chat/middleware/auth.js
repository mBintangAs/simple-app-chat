const { JwtVerify } = require("../utils/auth")

const AuthVerify = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const user = await JwtVerify(token)
        if (user) {
            const { _id, username } = user.data
            req.user = { _id, username };
            return next()
        }
        return res.json({ code: 401, message: 'unauthorized' })
    } catch (error) {
        return res.json({ code: 401, message: 'unauthorized' })
    }
}
module.exports = { AuthVerify }