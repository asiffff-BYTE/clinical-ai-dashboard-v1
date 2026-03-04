"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { usePatients, parseBloodPressure } from "@/contexts/patient-context"

/** Simple deterministic pseudo-random for chart variation */
function seeded(i: number, hr: number, map: number) {
  return Math.sin(i * 0.5 + hr * 0.1 + map * 0.1) * 0.5 + 0.5
}

/** Generate time-series data from current vitals (last point = current, earlier points simulated) */
function generateChartData(
  heartRate: number,
  map: number
): { time: string; hr: number; map: number }[] {
  const points = 11
  const data: { time: string; hr: number; map: number }[] = []
  const now = new Date()

  for (let i = points - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 30 * 60 * 1000)
    const timeStr = t.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    const progress = i / (points - 1)
    const hrVal =
      i === points - 1
        ? heartRate
        : Math.round(heartRate - (1 - progress) * 12 + seeded(i, heartRate, map) * 8)
    const mapVal =
      i === points - 1
        ? map
        : Math.round(map - (1 - progress) * 6 + seeded(i + 10, heartRate, map) * 6)
    data.push({
      time: timeStr,
      hr: Math.max(60, Math.min(140, hrVal)),
      map: Math.max(50, Math.min(120, mapVal)),
    })
  }
  return data
}

export function HemodynamicChart() {
  const { selectedPatient } = usePatients()

  const hrNum = selectedPatient?.heartRate
    ? parseInt(selectedPatient.heartRate, 10)
    : 112
  const bpParsed = parseBloodPressure(
    selectedPatient?.bloodPressure || "94/62"
  )
  const mapNum = bpParsed?.map ?? 72

  const data = useMemo(
    () => generateChartData(Number.isNaN(hrNum) ? 112 : hrNum, mapNum),
    [hrNum, mapNum]
  )

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">
            Live Hemodynamic Trends
            {selectedPatient && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                — {selectedPatient.patientName}
              </span>
            )}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <span className="text-xs text-muted-foreground">HR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-chart-2" />
              <span className="text-xs text-muted-foreground">MAP</span>
            </div>
          </div>
          <div className="flex gap-1">
            {["1H", "6H", "24H"].map((period, i) => (
              <button
                key={period}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                  i === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis stroke="#64748b" tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0b1228",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                color: "#e2e8f0",
              }}
            />
            <Line
              type="monotone"
              dataKey="hr"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="map"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
