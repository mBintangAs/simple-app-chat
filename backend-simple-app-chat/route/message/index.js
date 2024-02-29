const express = require('express')
const { index, store } = require('../../controller/message')
const { AuthVerify } = require('../../middleware/auth')
const router = express.Router()
router.get('/message', AuthVerify, index)
router.post('/message', AuthVerify, store)
module.exports = { router }
