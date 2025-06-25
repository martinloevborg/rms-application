import DeviceService from "@/services/deviceService";
import { Response, Request } from "express";

class DeviceController {
  private deviceService: DeviceService;

  constructor(deviceService: DeviceService) {
    this.deviceService = deviceService;
  }

  async getDevices(_: Request, res: Response) {
    try {
      const devices = this.deviceService.getAllDevices();
      res.status(200).json(devices);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving devices" });
    }
  }

  async getDeviceById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const device = this.deviceService.getDeviceById(Number.parseInt(id));
      if (device) {
        res.status(200).json(device);
      } else {
        res.status(404).json({ message: "Device not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving device" });
    }
  }
}

export default DeviceController;
