import { SensorReading, Alert, THRESHOLDS } from "@iot/shared";
import { AlertEvaluator } from "./AlertEvaluator";

export class ThresholdAlertEvaluator implements AlertEvaluator {
    evaluate(reading: SensorReading, now: number): Alert | null {
        const t = THRESHOLDS[reading.metric];

        if (reading.metric === "temperature") {
            if (reading.value >= t.critical) return this.buildAlert(reading, "critical", now);
            if (reading.value >= t.warning) return this.buildAlert(reading, "warning", now);
        } else if (reading.metric === "humidity") {
            if (reading.value <= t.critical) return this.buildAlert(reading, "critical", now);
            if (reading.value <= t.warning) return this.buildAlert(reading, "critical", now);
        }

        return null;
    }

    private buildAlert(reading: SensorReading, level: "warning" | "critical", now: number): Alert {
        return {
            deviceId: reading.deviceId,
            metric: reading.metric,
            value: reading.value,
            level,
            timestamp: now
        }
    }
}