import mqtt from "mqtt";
import { startDevice } from "./device.js";
import {
    BROKER_URL,
    DEVICE_COUNT,
    CLIENT_ID_PREFIX
} from "./config.js";

type DeviceResources = {
    client: mqtt.MqttClient;
    telemetryTimer: NodeJS.Timeout;
    heartbeatTimer: NodeJS.Timeout;
}

const devices = new Map<string, DeviceResources>();

console.log(`Starting simulator with ${DEVICE_COUNT} devices...`);

for (let i = 1; i <= DEVICE_COUNT; i++) {
    const deviceId = `dev-${i}`;
    const clientId = `${CLIENT_ID_PREFIX}-${deviceId}`;

    const client = mqtt.connect(BROKER_URL, { clientId });

    client.on("connect", () => {
        console.log(`[${deviceId}] connected to broker`);
        const { telemetryTimer, heartbeatTimer } = startDevice(deviceId, client);
        devices.set(deviceId, { client, telemetryTimer, heartbeatTimer });
    });

    client.on("error", (err) => {
        console.error(`[${deviceId}] connection error:`, err.message);
    });
}

process.on("SIGINT", () => {
    console.log("\nShutting down simulator...");
    for (const [deviceId, { client, telemetryTimer, heartbeatTimer }] of devices) {
        clearInterval(telemetryTimer);
        clearInterval(heartbeatTimer);
        client.end();
        console.log(`[${deviceId}] stopped`)
    }

    process.exit(0);
});