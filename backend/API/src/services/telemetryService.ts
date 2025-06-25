type TelemetryDataType =
  | "temperature"
  | "humidity"
  | "pressure"
  | "voltage"
  | "current"
  | "altitude"
  | "speed"
  | "battery"
  | "signalStrength";

type TelemetryDataUnit = "°C" | "%" | "hPa" | "V" | "A" | "m" | "km/h" | "dBm";

type TelemetryDataMetaDataEntry = {
  id: number;
  type: TelemetryDataType;
  unit: TelemetryDataUnit;
};

type TelemetryDataMetaData = TelemetryDataMetaDataEntry[];

const telemetryDataMetaData: TelemetryDataMetaData = [
  { id: 1, type: "temperature", unit: "°C" },
  { id: 2, type: "humidity", unit: "%" },
  { id: 3, type: "pressure", unit: "hPa" },
  { id: 4, type: "voltage", unit: "V" },
  { id: 5, type: "current", unit: "A" },
  { id: 6, type: "altitude", unit: "m" },
  { id: 7, type: "speed", unit: "km/h" },
  { id: 8, type: "battery", unit: "%" },
  { id: 9, type: "signalStrength", unit: "dBm" },
];

type TelemetryDataPoint = {
  value: number;
  timestamp: string;
};

type TelemetryData = Record<number, TelemetryDataPoint>;

export class TelemetryService {
  getTelemetryDataMetaData(): TelemetryDataMetaData {
    return telemetryDataMetaData;
  }
  getTelemetryForDevice(): TelemetryData {
    const timestamp = new Date().toISOString();
    const telemetryData: TelemetryData = {};
    for (const id in telemetryDataMetaData) {
      const { type } = telemetryDataMetaData[Number(id)];
      let value: number;
      switch (type) {
        case "temperature":
          value = this.generateRandomNumber(-40, 85); // Celsius
          break;
        case "humidity":
          value = this.generateRandomNumber(0, 100); // Percent
          break;
        case "pressure":
          value = this.generateRandomNumber(950, 1050); // hPa
          break;
        case "voltage":
          value = this.generateRandomNumber(1, 230); // Volts
          break;
        case "current":
          value = this.generateRandomNumber(0, 100); // Amps
          break;
        case "altitude":
          value = this.generateRandomNumber(-100, 10000); // Meters
          break;
        case "speed":
          value = this.generateRandomNumber(0, 300); // km/h
          break;
        case "battery":
          value = this.generateRandomNumber(0, 100); // Percent
          break;
        case "signalStrength":
          value = this.generateRandomNumber(-120, 0); // dBm
          break;
        default:
          value = this.generateRandomNumber(0, 100);
      }
      telemetryData[Number(id)] = {
        value: value,
        timestamp,
      };
    }
    return telemetryData;
  }

  generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
