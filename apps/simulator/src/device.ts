import { MqttClient } from "mqtt";
import { TOPICS_MQTT, SensorReading, Metric } from "@iot/shared";
import {
    HEARTBEAT_INTERVAL_MS,
    METRIC_BASES,
    NOISE_AMPLITUDE,
    OSCILLATION_FREQUENCY,
    TELEMETRY_INTERVAL_MS
} from "./config"

export function startDevice(deviceId: string, client: MqttClient) {
    const startTime = Date.now();

    const telemetryTimer = setInterval(() => {
        const t = (Date.now() - startTime) / 1000

        for (const metric of Object.keys(METRIC_BASES) as Metric[]) {
            const { base, amplitude } = METRIC_BASES[metric];
            const noise = (Math.random() - 0.5) * 2 * NOISE_AMPLITUDE;
            const value = base + amplitude * Math.sin(OSCILLATION_FREQUENCY * t) + noise;

            const reading: SensorReading = {
                deviceId,
                metric,
                value: Math.round(value * 100) / 100,
                timestamp: Date.now()
            }

            client.publish(TOPICS_MQTT.telemetry(deviceId), JSON.stringify(reading), { qos: 0 });
            console.log(`[${deviceId}] ${metric}=${reading.value}`);
        }
    }, TELEMETRY_INTERVAL_MS);

    const heartbeatTimer = setInterval(() => {
        const heartbeat = { deviceId, timestamp: Date.now() }
        client.publish(TOPICS_MQTT.heartbeat(deviceId), JSON.stringify(heartbeat), { qos: 0 });
        console.log(`[${deviceId}] heartbeat`);
    }, HEARTBEAT_INTERVAL_MS);

    return {
        telemetryTimer,
        heartbeatTimer
    }
}