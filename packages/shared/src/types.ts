export type Metric = "temperature" | "humidity"

export interface SensorReading {
    deviceId: string;
    metric: Metric;
    value: number;
    timestamp: number; // epoch ms enviado por dispositivo
}

export interface DeviceState {
    deviceId: string;
    lastSeen: number;
    online: boolean;
    lastReading: SensorReading | null;
}

export type AlertLevel = "warning" | "critical";

export interface Alert {
    deviceId: string;
    metric: Metric;
    value: number;
    level: AlertLevel;
    timestamp: number;
}

export type ServerEvent =
    | { type: "snapshot"; payload: { devices: DeviceState[] } }
    | { type: "reading"; payload: SensorReading; }
    | { type: "alert"; payload: Alert }
    | { type: "device:online"; payload: { deviceId: string, timestamp: number } }
    | { type: "device:offline"; payload: { deviceId: string, timestamp: number } }
;