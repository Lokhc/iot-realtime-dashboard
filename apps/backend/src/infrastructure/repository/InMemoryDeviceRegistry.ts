import { DeviceState, SensorReading } from "@iot/shared";
import { DeviceRegistry } from "../../domain/DeviceRegistry";
import { HEARTBEAT_TIMEOUT_MS } from "../../config";

class InMemoryDeviceRegistry implements DeviceRegistry {
    private devices = new Map<string, DeviceState>();

    update(reading: SensorReading, now: number): void {
        let state = this.devices.get(reading.deviceId);
        if (!state) {
            state = {
                deviceId: reading.deviceId,
                lastSeen: now,
                online: true,
                lastReadings: {}
            }

            this.devices.set(reading.deviceId, state);
        }

        state.lastSeen = now;
        state.online = true;
        state.lastReadings[reading.metric] = reading;
    }

    updateHeartbeat(deviceId: string, now: number): void {
        let state = this.devices.get(deviceId);
        if (!state) {
            state = {
                deviceId,
                lastSeen: now,
                online: true,
                lastReadings: {}
            }

            this.devices.set(deviceId, state);
        }

        state.lastSeen = now;
        state.online = true;
    }

    getState(deviceId: string, now: number): DeviceState | undefined {
        const state = this.devices.get(deviceId);
        if (!state) return undefined;

        return {
            ...state,
            online: (now - state.lastSeen) <= HEARTBEAT_TIMEOUT_MS
        }
    }

    getAll(now: number): DeviceState[] {
        return Array.from(this.devices.values()).map(state => ({
            ...state,
            online: (now - state.lastSeen) <= HEARTBEAT_TIMEOUT_MS
        }));
    }
}