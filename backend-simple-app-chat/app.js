const express = require('express')
const app = express()
require('dotenv').config()
const { router: ChatRoute } = require('./route/chat')
const { router: AuthRoute } = require('./route/auth')
const { main } = require('./model')
const bodyParser = require('body-parser')
const { HashPassword } = require('./utils/auth')

main().then(() => { console.log('success conected') }).catch(err => console.log(err));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(AuthRoute)
app.use(ChatRoute)
app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} listening on port ${process.env.APP_PORT}`)
})

