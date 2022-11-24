const List  = require('../models/toDoModel');
const db = require('./db');
const newID = require("../server/utility/snowflake");

async function seed() {
    await db.sync( {
        force: true
    })

    await List.create({
        id: newID().toString(),
        title: 'Really cool note',
        description: 'This note exists',
        status: 1
    })

    await List.create({
        id: newID().toString(),
        title: 'Really cool note',
        description: 'This note exists',
        status: 1
    })

    await List.create({
        id: newID().toString(),
        title: 'Really cool note',
        description: 'This note exists',
        status: 1
    })
}

module.exports = seed