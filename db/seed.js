const List  = require('../models/toDoModel')
const db = require('./db')


async function seed() {

    await db.sync({
        force:true
    })
        

}

seed()

module.exports = seed