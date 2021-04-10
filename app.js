require('dotenv').config()
require('./db/conn')
const registerRoutes = require('./routes/registerAuth')
const loginRoutes = require('./routes/loginAuth')
const express = require('express')
const app = express()

app.use(express.json())
app.use(registerRoutes)
app.use(loginRoutes)

app.listen(process.env.PORT || 3000)