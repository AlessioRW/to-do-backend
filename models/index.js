const User = require("./user");
const List = require("./reminder");

User.hasMany(List);
List.belongsTo(User);

module.exports = { User, List };