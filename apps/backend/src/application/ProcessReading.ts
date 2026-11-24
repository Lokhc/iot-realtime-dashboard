import { SensorReading } from "@iot/shared";
import { AlertEvaluator } from "../domain/AlertEvaluator.js";
import { DeviceRegistry } from "../domain/DeviceRegistry.js";
import { Alert } from "@iot/shared";

export interface ProcessReadingResult {
    reading: SensorReading;
    alert: Alert | null;
}

export class ProcessReading {
    constructor(
        private registry: DeviceRegistry,
        private alertEvaluator: AlertEvaluator
    ) { }

    execute(reading: SensorReading, now: number): ProcessReadingResult {
        this.registry.update(reading, now);
        const alert = this.alertEvaluator.evaluate(reading, now);
        return { reading, alert }
    }
}