const DeviceIoTState = {
  Enabled: "Enabled",
  Disabled: "Disabled",
} as const;

export type DeviceIoTState =
  (typeof DeviceIoTState)[keyof typeof DeviceIoTState];

const DeviceConnectionStatus = {
  Disconnected: "Disconnected",
  Connected: "Connected",
} as const;
export type DeviceConnectionStatus =
  (typeof DeviceConnectionStatus)[keyof typeof DeviceConnectionStatus];

type DeviceType = "Gateway" | "Controller";

type Device = {
  id: number;
  name: string;
  serialNumber: string;
  type: DeviceType;
  connectionStatus: DeviceConnectionStatus;
  iotState: DeviceIoTState;
};

export default class DeviceService {
  private devices: Device[];

  constructor() {
    this.devices = [
      {
        id: 1,
        serialNumber: "SN123456789",
        name: "Nebula",
        type: "Gateway",
        connectionStatus: DeviceConnectionStatus.Connected,
        iotState: DeviceIoTState.Enabled,
      },
      {
        id: 2,
        serialNumber: "SN987654321",
        name: "Quantum",
        type: "Controller",
        connectionStatus: DeviceConnectionStatus.Disconnected,
        iotState: DeviceIoTState.Disabled,
      },
      {
        id: 3,
        serialNumber: "SN1122334455",
        name: "Starlord",
        type: "Gateway",
        connectionStatus: DeviceConnectionStatus.Connected,
        iotState: DeviceIoTState.Enabled,
      },
      {
        id: 4,
        serialNumber: "SN5566778899",
        name: "Pixel Pulse",
        type: "Controller",
        connectionStatus: DeviceConnectionStatus.Disconnected,
        iotState: DeviceIoTState.Enabled,
      },
      {
        id: 5,
        serialNumber: "SN9988776655",
        name: "Cosmic Bridge",
        type: "Gateway",
        connectionStatus: DeviceConnectionStatus.Disconnected,
        iotState: DeviceIoTState.Disabled,
      },
      {
        id: 6,
        serialNumber: "SN2233445566",
        name: "Synthwave",
        type: "Controller",
        connectionStatus: DeviceConnectionStatus.Disconnected,
        iotState: DeviceIoTState.Disabled,
      },
      {
        id: 7,
        serialNumber: "SN3344556677",
        name: "Photon",
        type: "Gateway",
        connectionStatus: DeviceConnectionStatus.Connected,
        iotState: DeviceIoTState.Enabled,
      },
      {
        id: 8,
        serialNumber: "SN4455667788",
        name: "Echo",
        type: "Controller",
        connectionStatus: DeviceConnectionStatus.Connected,
        iotState: DeviceIoTState.Enabled,
      },
      {
        id: 9,
        serialNumber: "SN6677889900",
        name: "Vortex",
        type: "Gateway",
        connectionStatus: DeviceConnectionStatus.Disconnected,
        iotState: DeviceIoTState.Disabled,
      },
      {
        id: 10,
        serialNumber: "SN7788990011",
        name: "Nova",
        type: "Controller",
        connectionStatus: DeviceConnectionStatus.Disconnected,
        iotState: DeviceIoTState.Enabled,
      },
    ];
  }

  getAllDevices() {
    return this.devices;
  }

  getDeviceById(id: number) {
    return this.devices.find((device) => device.id === id);
  }
}
