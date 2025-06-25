# Device telemetry and logs API

A simple Node.js/TypeScript API for getting devices, telemetry data, and logs.

---

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Build and run

```sh
npm start
```

---

## API Endpoints

### **GET /api/devices**

Returns a list of devices.

Schema: [Device](#device-schema).

**Example response:**

```json
[
  {
    "id": "1",
    "serialNumber": "SN123456789",
    "name": "Temperature Sensor",
    "type": "Gateway",
    "connectionStatus": "Connected",
    "iotState": "Enabled"
  }
]
```

---

### **GET /api/devices/{deviceId}**

Returns a specific device from Id.

Schema: [Device](#device-schema).

**Example response:**

```json
{
  "id": "1",
  "serialNumber": "SN123456789",
  "name": "Temperature Sensor",
  "type": "Gateway",
  "connectionStatus": "Connected",
  "iotState": "Enabled"
}
```

---

### **GET /api/telemetry/metadata**

Returns metadata about available telemetry fields and their data types.

Schema: [Telemetry Metadata](#telemetry-metadata-schema).

**Example response:**

```json
[
  { "id": 1, "type": "temperature", "unit": "°C" },
  { "id": 2, "type": "humidity", "unit": "%" }
]
```

### **GET /api/telemetry/{deviceId}**

Returns telemetry data for a specific device.

Schema: [Telemetry data](#telemetry-data-schema)

**Example response:**

```json
{
  "1": { "value": 31, "timestamp": "2025-06-19T11:27:44.835Z" },
  "2": { "value": 42, "timestamp": "2025-06-19T11:27:44.835Z" }
}
```

---

### **GET /api/logs/{deviceId}?page=1&pagesize=10**

Returns paginated log entries for a specific device.

Schema: [Log entry](#log-entry-schema)

**Example response:**

```json
[
  {
    "type": "Command",
    "message": "Device started",
    "timestamp": "2024-06-03T08:00:00.000Z"
  },
  {
    "type": "Event",
    "message": "Sensor triggered",
    "timestamp": "2024-06-03T08:05:00.000Z"
  },
  {
    "type": "Error",
    "message": "Error occurred",
    "timestamp": "2024-06-03T08:10:00.000Z"
  }
]
```

## Schemas

### <a id="device-schema"></a>Device schema

```json
[
   {
      "id": "number",
      "serialNumber": "string",
      "name": "string",
      "type": "Gateway" | "Controller",
      "connectionStatus": "Connected" | "Disconnected",
      "iotState": "Enabled" | "Disabled"
   }
]
```

### <a id="telemetry-metadata-schema"></a>Telemetry metadata schema

```json
[
  {
    "id": "number",
    "type": "string",
    "unit": "string"
  }
]
```

### <a id="telemetry-schema"></a>Telemetry data schema

**Note**: The `id` in this schema comes from the `id` in the [Telemetry metadata schema](#telemetry-metadata-schema)

```json
{
  "id": {
    "value": "number",
    "timestamp": "string (ISO 8601)"
  }
}
```

### <a id="log-entry-schema"></a>Log entry schema

```json
[
   {
      "type": "Command" | "Event" | "Error",
      "timestamp": "string (ISO 8601)",
      "message": "string"
   }
]
```

---

## Notes

- All endpoints return JSON.
- The API runs on `http://localhost:3000` by default (configurable in `index.ts`).
