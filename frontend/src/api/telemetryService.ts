export type TelemetryEntry = {
  deviceId: string;
  timestamp: string;
  metric: string;
  value: number;
};

const BASE_URL = 'http://localhost:3000/api';

export async function fetchTelemetry(deviceId: string): Promise<TelemetryEntry[]> {
  const response = await fetch(`${BASE_URL}/telemetry/${deviceId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch telemetry for device ${deviceId}: ${response.statusText}`);
  }
  return response.json();
}
