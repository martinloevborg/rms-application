import { TelemetryService } from "@/services/telemetryService";
import { Request, Response } from "express";

export default class TelemetryController {
  private telemetryService: TelemetryService;
  constructor(telemetryService: TelemetryService) {
    this.telemetryService = telemetryService;
  }

  getMetaData(_: Request, res: Response) {
    try {
      const metadata = this.telemetryService.getTelemetryDataMetaData();
      res.status(200).json(metadata);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving telemetry metadata" });
    }
  }

  getTelemetryData(_: Request, res: Response) {
    try {
      const telemetryData = this.telemetryService.getTelemetryForDevice();
      res.status(200).json(telemetryData);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving telemetry data" });
    }
  }
}
