import LogService from "@/services/logService";
import { Response, Request } from "express";

class LogController {
  private logService: LogService;
  constructor(logService: LogService) {
    this.logService = logService;
  }

  async getLogs(req: Request, res: Response) {
    try {
      const deviceId = parseInt(req.params.deviceId, 10);
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pagesize as string, 10) || 10;
      const logs = await this.logService.getLogs(deviceId, page, pageSize);
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving logs", error });
    }
  }
}

export default LogController;
