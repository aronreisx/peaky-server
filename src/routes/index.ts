import { Router } from "express";

import appointmentsRouter from "./appointments.routes";
import sessionsRouter from "./sessions.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);

export default routes;
