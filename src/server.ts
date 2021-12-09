import express from "express";

import routes from "./routes";

const { SERVER_PORT } = process.env;

import express from 'express';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(SERVER_PORT, () => {
  console.log(`[server] Server started on PORT ${SERVER_PORT}`)
})
