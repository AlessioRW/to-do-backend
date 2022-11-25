const { Router } = require("express");
const { Reminder } = require("../models");
const { body, param } = require("express-validator");
const toDoRouter = Router();

//get - gets all notes, sends 200 status and all notes as an object - get(localhost:[port]/)

toDoRouter.get("/", async (req, res) => {
  const allReminders = await Reminder.findAll();
  res.status(200).send(allReminders);
});

//add/post - posts a note using data from body, sends 201 status - post(localhost:[port]/)
toDoRouter.post(
  "/",
  body("title").isString().isAlphanumeric(),
  body("description").isString().isAlphanumeric(),
  body("status")
    .isNumeric()
    .custom((input) => input >= 1 && input <= 3),
  async (req, res) => {
    try {
      const body = req.body;
      await Reminder.create({
        title: body.title,
        description: body.description,
        status: 1,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  }
);

//put - gets id of item and writes new text or status, sends 200 - put(localhost:[port]/)
toDoRouter.put(
  "/",
  body("title").optional().isString().isAlphanumeric(),
  body("description").optional().isString().isAlphanumeric(),
  body("status")
    .optional()
    .isNumeric()
    .custom((input) => input >= 1 && input <= 3),
  async (req, res) => {
    try {
      const body = req.body;
      const item = await Reminder.findByPk(body.id);
      if (item == null) {
        res.sendStatus(404);
        return;
      }

      await item.update({
        title: body.title,
        description: body.description,
        status: body.status,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  }
);

//delete - deletes a list item by id - delete(localhost:[port]/:id)
toDoRouter.delete("/:id", param("id").isString().isNumeric(), async (req, res) => {
  try {
    const id = req.params.id;

    const requestedDelete = await Reminder.findByPk(id);
    if (requestedDelete == null) {
      res.sendStatus(404);
      return;
    }
    await requestedDelete.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = toDoRouter;
