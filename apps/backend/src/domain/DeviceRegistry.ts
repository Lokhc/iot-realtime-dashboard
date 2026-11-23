import { DeviceState, SensorReading } from "@iot/shared";

export interface DeviceRegistry {
    update(reading: SensorReading, now: number): void;
    updateHeartbeat(deviceId: string, now: number): void;
    getState(deviceId: string, now: number): DeviceState | undefined;
    getAll(now: number): DeviceState[];
}