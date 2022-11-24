const express = require('express')
const app = express()
const db = require('../db/db')
const seed = require('../db/seed')
const cors = require('cors')



app.use(express.json())
app.use(cors())


app.listen(5001, async () => {
    await db.sync()
    seed()
    console.log("listening on port 5001")
})

module.exports = app