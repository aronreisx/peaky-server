import "reflect-metadata";
import express from "express";
import "express-async-errors";

import uploadConfig from "./config/upload";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import routes from "./routes";
import "./database";

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use(globalErrorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`[server] Server started on http://localhost:${SERVER_PORT}`);
});
