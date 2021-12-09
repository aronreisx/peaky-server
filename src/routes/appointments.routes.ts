import { Router } from "express";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get("/", (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

});

export default appointmentsRouter;
