const { body } = require('express-validator');
const { User } = require('../../model/User');

const RegisterValidate = [
    body(['username', 'password']).notEmpty().withMessage('Harap Masukkan nilai'),
    body('username').custom(async (value) => {
        const user = await User.findOne({ username: value })
        if (user) {
            throw new Error('Username Sudah terdaftar! Silahkan cari username baru');
        }
    })
]
const LoginValidate = [
    body(['username', 'password']).notEmpty().withMessage('Harap Masukkan nilai'),
]
module.exports = { RegisterValidate, LoginValidate }