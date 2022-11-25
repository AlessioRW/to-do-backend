const { Router } = require("express");
const { body, param } = require("express-validator");
const { Reminder } = require("../models");

const toDoRouter = Router();

// get - gets all notes, sends 200 status and all notes as an object - get(localhost:[port]/)

toDoRouter.get("/", async (req, res) => {
  const allReminders = await Reminder.findAll();
  res.status(200).send(allReminders);
});

// add/post - posts a note using data from body, sends 201 status - post(localhost:[port]/)
toDoRouter.post(
  "/",
  body("title").isString().isAlphanumeric(),
  body("description").isString().isAlphanumeric(),
  body("status")
    .isNumeric()
    .custom((input) => input >= 1 && input <= 3),
  async (req, res) => {
    try {
      await Reminder.create({
        title: req.body.title,
        description: req.body.description,
        status: 1,
      });
      res.sendStatus(200);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.sendStatus(401);
    }
  }
);

// put - gets id of item and writes new text or status, sends 200 - put(localhost:[port]/)
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
      const item = await Reminder.findByPk(req.body.id);
      if (item == null) {
        res.sendStatus(404);
        return;
      }

      await item.update({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      });
      res.sendStatus(200);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.sendStatus(401);
    }
  }
);

// delete - deletes a list item by id - delete(localhost:[port]/:id)
toDoRouter.delete("/:id", param("id").isString().isNumeric(), async (req, res) => {
  try {
    const { id } = req.params;

    const requestedDelete = await Reminder.findByPk(id);
    if (requestedDelete == null) {
      res.sendStatus(404);
      return;
    }
    await requestedDelete.destroy();
    res.sendStatus(200);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = toDoRouter;
