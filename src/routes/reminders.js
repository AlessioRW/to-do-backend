const { Router } = require("express");
const { body, param } = require("express-validator");
const { User, Reminder } = require("../models");
const { verify } = require("../utility/token");

const remindersRouter = Router();

remindersRouter.post(
  "/get",
  body("token").isString().isAlphanumeric(),
  async (req, res) => {
    try {
      const { id } = verify(req.body.token);
      const user = await User.findByPk(id);
      if (user == null) {
        res.sendStatus(404);
        return;
      }
      const reminders = await user.getReminders();
      res.status(200).send(reminders);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.sendStatus(500);
    }
  }
);

remindersRouter.post(
  "/new",
  body("token").isString().isAlphanumeric(),
  async (req, res) => {
    try {
      const { id } = verify(req.body.token);
      const user = await User.findByPk(id);
      if (user == null) {
        res.sendStatus(404);
      }
      await user.createReminder({
        title: req.body.title,
        description: req.body.description,
        status: 1,
      });
      res.sendStatus(201);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.sendStatus(500);
    }
  }
);

remindersRouter.delete(
  "/:id",
  body("token").isString().isAlphanumeric(),
  param("id").isString().isNumeric(),
  async (req, res) => {
    try {
      const { id } = verify(req.body.token);
      const user = await User.findByPk(id);
      if (user == null) {
        res.sendStatus(404);
        return;
      }
      const reminder = await Reminder.findByPk(req.params.id);
      if (reminder.UserId === id) {
        await reminder.destroy();
        res.sendStatus(200);
        return;
      }
      res.sendStatus(400);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.sendStatus(500);
    }
  }
);

remindersRouter.put(
  "/:id",
  body("token").isString().isAlphanumeric(),
  body("important").isInt().isNumeric(),
  param("id").isString().isNumeric(),
  async (req, res) => {
    try {
      const { id } = verify(req.body.token);
      const user = await User.findByPk(id);
      if (user == null) {
        res.sendStatus(404);
        return;
      }
      const reminder = await Reminder.findByPk(req.params.id);

      if (reminder.UserId === id) {
        await reminder.update({
          important: req.body.important,
        });
        res.sendStatus(200);
        return;
      }
      res.sendStatus(200);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.sendStatus(500);
    }
  }
);

remindersRouter.put('/status/:id', async (req,res) => {
  try {
    const reminder = await Reminder.findByPk(req.params.id)
    await reminder.update({
      status: req.body.newStatus
    })
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = remindersRouter;
