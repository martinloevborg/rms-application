export type Device = {
  id: string;
  serialNumber: string;
  name: string;
  status: 'connected' | 'disconnected';
};

const BASE_URL = 'http://localhost:3000/api';

export async function fetchDevices(): Promise<Device[]> {
  const response = await fetch(`${BASE_URL}/devices`);
  if (!response.ok) {
    throw new Error(`Failed to fetch devices: ${response.statusText}`);
  }
  return response.json();
}