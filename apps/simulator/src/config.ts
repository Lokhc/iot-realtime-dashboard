export const BROKER_URL = "mqtt://test.mosquitto.org:1883";
export const DEVICE_COUNT = 5;
export const TELEMETRY_INTERVAL_MS = 2000;
export const HEARTBEAT_INTERVAL_MS = 5000;
export const CLIENT_ID_PREFIX = "sim";

export const METRIC_BASES = {
    temperature: { base: 25, amplitude: 5 },
    humidity: { base: 50, amplitude: 15 }
} as const;

export const NOISE_AMPLITUDE = 1;
export const OSCILLATION_FREQUENCY = 0.3;