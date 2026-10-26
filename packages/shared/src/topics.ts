// topics MQTT
export const TOPICS_MQTT = {
    telemetry: (deviceId: string) => `devices/${deviceId}/telemetry`,
    heartbeat: (deviceId: string) => `devices/${deviceId}/heartbeat`,
    telemetryWildcard: "devices/+/telemetry",
    heartbeatWildcard: "devices/+/heartbeat"
} as const;