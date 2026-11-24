import { DeviceRegistry } from "../domain/DeviceRegistry.js";

export class ProcessHeartbeat {
    constructor (
        private registry: DeviceRegistry
    ) {}

    execute(deviceId: string, now: number): void {
        this.registry.updateHeartbeat(deviceId, now);
    }
}