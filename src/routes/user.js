const { Router } = require("express");
const argon2 = require("argon2");
const { User } = require("../models");
const { sign } = require("../utility/token");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    const hash = await argon2.hash(req.body.password);
    await User.create({ email: req.body.email, password: hash });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.sendStatus(500);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user != null && (await argon2.verify(user.password, req.body.password))) {
      const token = sign(user.id);
      res.status(200).send({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = userRouter;
