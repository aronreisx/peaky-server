import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";
import routes from "./routes";
import "./database";

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "Internal srver error",
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`[server] Server started on http://localhost:${SERVER_PORT}`);
});
