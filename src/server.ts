import "reflect-metadata";
import express from "express";

import routes from "./routes";
import "./database";

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(SERVER_PORT, () => {
  console.log(`[server] Server started on http://localhost:${SERVER_PORT}`);
});
