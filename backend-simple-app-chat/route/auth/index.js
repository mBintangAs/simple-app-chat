const express = require('express')
const { index, store } = require('../../controller/auth')
const { RegisterValidate, LoginValidate } = require('../../middleware/validator/auth')
const router = express.Router()

router.post('/login',LoginValidate ,index)
router.post('/register',RegisterValidate, store)
module.exports = { router }
