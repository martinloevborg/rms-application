import express from "express";
import { setDeviceRoutes } from "./routes/deviceRoutes.js";
import { setTelemetryRoutes } from "./routes/telemetryRoutes.js";
import { setLogRoutes } from "./routes/logRoutes.js";
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());

setDeviceRoutes(app);
setTelemetryRoutes(app);
setLogRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
