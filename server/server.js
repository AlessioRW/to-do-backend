const express = require('express')
const db = require('../db/db')
const seed = require('../db/seed')
const cors = require('cors')
const {toDoRouter} = require('./routes/index.route')


const app = express()
app.use(express.json())
app.use(cors())

app.use('/toDo', toDoRouter)


app.listen(5001, async () => {
    await db.sync()
    await seed()
    console.log("listening on port 5001")
})

module.exports = app