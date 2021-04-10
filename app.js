require('dotenv').config()
require('./db/conn')
require('./routes/registerAuth')
const registerRoutes = require('./routes/registerAuth')
const express = require('express')
const app = express()

app.use(express.json())
app.use(registerRoutes)

app.listen(process.env.PORT || 3000)