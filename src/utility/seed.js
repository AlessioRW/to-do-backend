const argon2 = require("argon2");
const db = require("../db/db");
const { User } = require("../models");

async function seed() {
  await db.sync({
    force: true,
  });

  const hash = await argon2.hash("password");
  const user = await User.create({
    email: "test@example.com",
    password: hash,
  });

  await user.createReminder({
    title: "Really cool note",
    description: "This note exists",
    status: 1,
  });

  await user.createReminder({
    title: "Really cool note",
    description: "This note exists",
    status: 2,
  });

  await user.createReminder({
    title: "Really cool note",
    description: "This note exists",
    status: 3,
  });
}

module.exports = seed;
