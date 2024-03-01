const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
// Fungsi untuk menghasilkan hash password
async function HashPassword(password) {
    try {
        // Generate salt (unique random string)
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the salt
        const hash = await bcrypt.hash(password, salt);

        return hash;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}
// Fungsi untuk membandingkan password dengan hash
async function ComparePasswords(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}

const JwtSign = async (data) => {
    try {
        return jwt.sign({
            data: data
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    } catch (error) {
        return error
    }
}
const JwtVerify = async (data) => {
    try {
        return jwt.verify(data, process.env.JWT_SECRET)
    } catch (error) {
        console.log(error)
        return false
    }

}
module.exports = { HashPassword, ComparePasswords, JwtSign,JwtVerify }
