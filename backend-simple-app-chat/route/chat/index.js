const express = require('express')
const { index } = require('../../controller/chat')
const { AuthVerify } = require('../../middleware/auth')
const router = express.Router()
router.get('/chat', AuthVerify, index)
module.exports = { router }
