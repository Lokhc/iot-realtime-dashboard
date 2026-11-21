import mqtt from "mqtt";
import { startDevice } from "./device";
import {
    BROKER_URL,
    DEVICE_COUNT,
    CLIENT_ID_PREFIX
} from "./config";

type DeviceResources = {
    client: mqtt.MqttClient;
    telemetryTimer: NodeJS.Timeout;
    heartbeatTimer: NodeJS.Timeout;
}

const devices = new Map<string, DeviceResources>();

for (let i = 1; i <= DEVICE_COUNT; i++) {
    const deviceId = `dev-${i}`;
    const clientId = `${CLIENT_ID_PREFIX}-${deviceId}`

    const client = mqtt.connect(BROKER_URL, { clientId });

    client.on("connect", () => {
        console.log(`[${deviceId}] connected to broker`);
        const { telemetryTimer, heartbeatTimer } = startDevice(clientId, client);
        devices.set(deviceId, { client, telemetryTimer, heartbeatTimer });
    });

    client.on("error", (err) => {
        console.error(`[${deviceId}] connection error:`, err.message);
    });
}