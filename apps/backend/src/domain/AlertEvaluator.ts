import { SensorReading, Alert } from "@iot/shared";

export interface AlertEvaluator {
    evaluate(reading: SensorReading, now: number): Alert | null;
}