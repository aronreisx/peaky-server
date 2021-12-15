import { Router } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const authenticatedUser = Object.assign(user);
    delete authenticatedUser.password;

    return res.json({ authenticatedUser, token });
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
