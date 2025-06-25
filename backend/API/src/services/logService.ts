import { readFile } from "fs/promises";
import { join } from "path";

type LogType = "Command" | "Event" | "Error";

type LogEntry = {
  type: LogType;
  message: string;
  timestamp: string;
};

type DeviceLogEntries = Record<number, LogEntry[]>;

export default class LogService {
  constructor() {}

  async getLogs(
    deviceId: number,
    page: number = 1,
    pageSize: number = 10
  ): Promise<LogEntry[]> {
    try {
      const logsPath = join(process.cwd(), "src", "data", "logs.json");
      const data = await readFile(logsPath, "utf-8");
      const logs: DeviceLogEntries = JSON.parse(data);
      const deviceLogs = logs[deviceId] || [];
      const start = (page - 1) * pageSize;
      const paginatedLogs = deviceLogs.slice(start, start + pageSize);

      return paginatedLogs;
    } catch (err) {
      throw new Error(`Error reading logs for device ${deviceId}: ${err}`);
    }
  }
}
