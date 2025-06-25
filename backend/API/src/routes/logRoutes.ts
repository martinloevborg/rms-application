import express, { Application } from "express";
import LogController from "../controllers/logController.js";
import LogService from "../services/logService.js";

export function setLogRoutes(app: Application) {
  const router = express.Router();
  const logController = new LogController(new LogService());

  router.get("/logs/:deviceId", logController.getLogs.bind(logController));

  app.use("/api", router);
}
