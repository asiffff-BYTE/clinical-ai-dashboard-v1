"use client"

import { Clock } from "lucide-react"

interface AlertData {
  patient: string
  bed: string
  condition: string
  time: string
  vitals: { label: string; value: string; color: string }[]
  baseline?: string
  actions: string[]
}

const alerts: AlertData[] = [
  {
    patient: "John Doe",
    bed: "Bed 04",
    condition: "Respiratory Failure Risk (High)",
    time: "2m ago",
    vitals: [
      { label: "SPO2", value: "88%", color: "#ef4444" },
    ],
    baseline: "96%",
    actions: ["Acknowledge", "Dispatch Team"],
  },
  {
    patient: "Jane Smith",
    bed: "Bed 12",
    condition: "Sepsis Onset Prediction",
    time: "5m ago",
    vitals: [
      { label: "HR", value: "115 bpm", color: "#f59e0b" },
      { label: "TEMP", value: "38.9\u00b0C", color: "#ef4444" },
    ],
    actions: ["Acknowledge", "Review Labs"],
  },
  {
    patient: "Robert Brown",
    bed: "Bed 09",
    condition: "Hypotensive Crisis",
    time: "8m ago",
    vitals: [
      { label: "BP", value: "85/50", color: "#ef4444" },
    ],
    actions: ["Acknowledge", "Dispatch Team"],
  },
  {
    patient: "Alice White",
    bed: "Bed 21",
    condition: "Arrhythmia Detection",
    time: "12m ago",
    vitals: [
      { label: "PVCS", value: ">10 /min", color: "#ef4444" },
    ],
    actions: ["Acknowledge", "ECG View"],
  },
]

export function AlertCards() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold" style={{ color: "var(--nurse-foreground)" }}>
            Active Alerts
          </h2>
          <span className="rounded-full bg-destructive px-2.5 py-0.5 text-xs font-bold text-destructive-foreground">
            4 Critical
          </span>
        </div>
        <button className="ml-auto flex items-center gap-1.5 text-sm font-medium text-primary">
          <Clock className="h-4 w-4" />
          History
        </button>
      </div>
      <p className="text-sm" style={{ color: "var(--nurse-muted-foreground)" }}>
        Real-time risk prediction from AI-CDS
      </p>

      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className="rounded-xl border p-4"
            style={{ borderColor: "var(--nurse-border)", backgroundColor: "var(--nurse-card)" }}
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-base font-bold" style={{ color: "var(--nurse-foreground)" }}>
                  {alert.patient} - {alert.bed}
                </p>
                <p className="text-sm" style={{ color: "var(--nurse-muted-foreground)" }}>
                  {alert.condition}
                </p>
              </div>
              <span className="text-sm font-semibold text-destructive">{alert.time}</span>
            </div>

            <div className="mb-3 flex items-center gap-4">
              {alert.vitals.map((v) => (
                <div key={v.label} className="rounded-lg px-3 py-2" style={{ backgroundColor: `${v.color}15` }}>
                  <p className="text-[10px] font-bold uppercase" style={{ color: v.color }}>
                    {v.label}
                  </p>
                  <p className="text-xl font-extrabold" style={{ color: v.color }}>
                    {v.value}
                  </p>
                </div>
              ))}
              {alert.baseline && (
                <div>
                  <p className="text-[10px] font-bold uppercase" style={{ color: "var(--nurse-muted-foreground)" }}>
                    Baseline
                  </p>
                  <p className="text-xl font-bold" style={{ color: "var(--nurse-foreground)" }}>
                    {alert.baseline}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {alert.actions.map((action, i) => (
                <button
                  key={action}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "border text-[var(--nurse-foreground)]"
                  }`}
                  style={i !== 0 ? { borderColor: "var(--nurse-border)" } : undefined}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
