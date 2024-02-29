const express = require('express')
const { index, store } = require('../../controller/chat')
const { AuthVerify } = require('../../middleware/auth')
const router = express.Router()
router.get('/chat', AuthVerify, index)
router.post('/chat', AuthVerify, store)
module.exports = { router }
