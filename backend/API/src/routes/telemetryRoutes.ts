import express, { Application } from "express";
import TelemetryController from "../controllers/telemetryController.js";
import { TelemetryService } from "../services/telemetryService.js";

export function setTelemetryRoutes(app: Application) {
  const router = express.Router();
  const telemetryController = new TelemetryController(new TelemetryService());

  router.get(
    "/telemetry/metadata",
    telemetryController.getMetaData.bind(telemetryController)
  );
  router.get(
    "/telemetry/:deviceId",
    telemetryController.getTelemetryData.bind(telemetryController)
  );

  app.use("/api", router);
}
