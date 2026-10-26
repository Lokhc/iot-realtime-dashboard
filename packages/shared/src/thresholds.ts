import { Metric } from "./types"

export const THRESHOLDS: Record<Metric, { warning: number; critical: number; }> = {
    temperature: { warning: 70, critical: 80 },
    humidity: { warning: 30, critical: 20 }
}