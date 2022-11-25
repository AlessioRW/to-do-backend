const { Snowflake } = require("nodejs-snowflake");

const snowflake = new Snowflake({ custom_epoch: 1640995200000, instance_id: 0 });

function newID() {
  return snowflake.getUniqueID();
}

module.exports = newID;
