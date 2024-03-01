const express = require('express')
const { index, store, show } = require('../../controller/chat')
const { AuthVerify } = require('../../middleware/auth')
const router = express.Router()
router.get('/chat', AuthVerify, index)
router.post('/chat', AuthVerify, store)
router.get('/chat/:id', AuthVerify, show)
module.exports = { router }
