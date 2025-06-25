import express, { Application } from "express";
import DeviceController from "../controllers/deviceController.js";
import DeviceService from "../services/deviceService.js";

export function setDeviceRoutes(app: Application) {
  const router = express.Router();
  const deviceController = new DeviceController(new DeviceService());

  router.get("/devices", deviceController.getDevices.bind(deviceController));
  router.get(
    "/devices/:id",
    deviceController.getDeviceById.bind(deviceController)
  );

  app.use("/api", router);
}
