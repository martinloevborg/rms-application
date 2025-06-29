export type LogEntry = {
  type: 'Command' | 'Event' | 'Error';
  timestamp: string;
  message: string;
};

const BASE_URL = 'http://localhost:3000/api';

export async function fetchLogs(deviceId: string, page = 1, pageSize = 10): Promise<LogEntry[]> {
  const response = await fetch(`${BASE_URL}/logs/${deviceId}?page=${page}&pagesize=${pageSize}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch logs: ${response.statusText}`);
  }
  return response.json();
}
