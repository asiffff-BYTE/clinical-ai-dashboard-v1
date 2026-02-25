"use client"

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

const data = [
  { time: "10:00", hr: 95, map: 72 },
  { time: "10:30", hr: 102, map: 68 },
  { time: "11:00", hr: 98, map: 75 },
  { time: "11:30", hr: 108, map: 65 },
  { time: "12:00", hr: 112, map: 60 },
  { time: "12:30", hr: 105, map: 68 },
  { time: "13:00", hr: 118, map: 55 },
  { time: "13:30", hr: 110, map: 62 },
  { time: "14:00", hr: 115, map: 58 },
  { time: "14:30", hr: 108, map: 65 },
  { time: "15:00", hr: 112, map: 60 },
]

export function HemodynamicChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">
            Live Hemodynamic Trends
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
