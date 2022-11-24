const List  = require('../models/toDoModel')
const db = require('./db')


async function seed() {

    await db.sync({
        force:true
    })

    await List.create({
        title: 'Really cool note',
        description: 'This note exists',
        status: 1
    })
        

}

seed()

module.exports = seed