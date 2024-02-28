const { JwtVerify } = require("../utils/auth")

const AuthVerify = async (req,res,next) => {
try {
    const token = req.headers.authorization
    const user =  await JwtVerify(token)
    if (user) {
        req.user=user;
        console.log(req.user);
        return next()
    }
    return res.json({message:'unauthorized'})
} catch (error) {
    return res.status(401).json(error)
}
}
module.exports = { AuthVerify }