const User = require("./User");
const Reminder = require("./Reminder");

User.hasMany(Reminder);
Reminder.belongsTo(User);

module.exports = { User, Reminder };
