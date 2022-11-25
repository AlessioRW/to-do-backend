const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const seed = require("./utility/seed");
const toDoRouter = require("./routes/todo");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/toDo", toDoRouter);

app.listen(5001, async () => {
  await db.sync({ force: true });
  await seed();
  // eslint-disable-next-line no-console
  console.log("listening on port 5001");
});

module.exports = app;
