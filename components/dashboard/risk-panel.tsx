"use client"

import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  X,
  Lightbulb,
  Droplets,
  FlaskConical,
  Syringe,
  CircleDot,
} from "lucide-react"
import { usePatients, hasVitalRisk } from "@/contexts/patient-context"
import { useSettings } from "@/contexts/settings-context"

const suggestions = [
  {
    icon: Droplets,
    title: "Initiate IV Fluids",
    description:
      "MAP is dropping below 65 mmHg. Consider 500ml saline bolus based on volume responsiveness index.",
    color: "text-chart-3",
  },
  {
    icon: FlaskConical,
    title: "Order Repeat Lactate",
    description:
      "Previous lactate was 4.1 mmol/L. Clearance needs to be monitored within the next 60 mins.",
    color: "text-primary",
  },
  {
    icon: Syringe,
    title: "Adjust Vasopressors",
    description:
      "Increase Norepinephrine to 0.1 mcg/kg/min if SBP remains below 90 mmHg for >5 mins.",
    color: "text-primary",
  },
  {
    icon: CircleDot,
    title: "Culture Review",
    description:
      "Blood cultures from admission (48h ago) are pending final report. Check microbiology.",
    color: "text-muted-foreground",
  },
]

function computeRiskScore(patient: { oxygenLevel?: string; heartRate?: string } | null): number {
  if (!patient) return 84
  const o2 = parseInt(patient.oxygenLevel || "", 10)
  const hr = parseInt(patient.heartRate || "", 10)
  let score = 50
  if (!Number.isNaN(o2)) {
    if (o2 < 90) score += 35
    else if (o2 <= 95) score += 15
  }
  if (!Number.isNaN(hr)) {
    if (hr > 140) score += 30
    else if (hr > 120) score += 15
  }
  return Math.min(99, score)
}

export function RiskPanel() {
  const router = useRouter()
  const { selectedPatient } = usePatients()
  const { alertsEnabled } = useSettings()
  const patientRisk = hasVitalRisk(selectedPatient)
  const riskScore = computeRiskScore(selectedPatient)

  const riskMessage = patientRisk
    ? (() => {
        const o2 = parseInt(selectedPatient?.oxygenLevel || "", 10)
        const hr = parseInt(selectedPatient?.heartRate || "", 10)
        const parts: string[] = []
        if (!Number.isNaN(o2) && o2 < 90) parts.push(`Low SpO2 (${o2}%)`)
        if (!Number.isNaN(hr) && hr > 140) parts.push(`Elevated HR (${hr} BPM)`)
        return parts.join(" • ")
      })()
    : null

  return (
    <aside className="w-full space-y-4 lg:w-80">
      {/* Critical / Risk Alert - show when O2<90 or HR>140 (respects alerts toggle) */}
      {alertsEnabled && (patientRisk || riskScore >= 70) && (
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4">
          <div className="mb-2 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                  {patientRisk ? "Critical Alert: Vital Risk" : "AI Risk Analysis"}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {patientRisk && riskMessage
                    ? `${selectedPatient?.patientName || "Patient"} — ${riskMessage}`
                    : `${selectedPatient?.patientName || "Bed 12"} showing rapid vital deterioration. AI suggests immediate lactate review.`}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss alert</span>
            </button>
          </div>
          <p className="mb-3 text-sm font-semibold text-foreground">AI Risk Analysis</p>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/nurse-station")}
              className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              Acknowledge
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              Go to Vitals
            </button>
          </div>
        </div>
      )}

      {/* Risk Score */}
      <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#1e293b"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={patientRisk ? "#ef4444" : riskScore >= 70 ? "#ef4444" : "#64748b"}
              strokeWidth="8"
              strokeDasharray={`${(riskScore / 100) * 327} 327`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-4xl font-extrabold ${patientRisk ? "text-destructive" : "text-foreground"}`}>
              {riskScore}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Risk Score
            </span>
          </div>
        </div>
      </div>

      {/* Deterioration Risk */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-chart-3" />
          <p className="text-sm font-bold text-foreground">
            {patientRisk ? "High Deterioration Risk" : "Deterioration Risk"}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Probability of septic shock within 4 hours:{" "}
          <span className="font-bold text-foreground">{patientRisk ? "78" : Math.min(78, riskScore + 20)}%</span>
        </p>
        <div className="mt-3 flex gap-2">
          {[
            { label: "Stable", color: "bg-chart-2" },
            { label: "Guarded", color: "bg-chart-3" },
            { label: "Critical", color: "bg-destructive" },
          ].map((status) => (
            <div
              key={status.label}
              className={`flex flex-1 flex-col items-center rounded-lg border border-border p-2 ${
                status.label === "Critical" && patientRisk
                  ? "border-destructive/50 bg-destructive/10"
                  : "bg-secondary"
              }`}
            >
              <span className="text-xs font-semibold uppercase text-foreground">
                {status.label}
              </span>
              <div className={`mt-1 h-2 w-2 rounded-full ${status.color}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Suggestions */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-chart-3" />
          <h3 className="text-lg font-bold text-foreground">Clinical Suggestions</h3>
        </div>
        <div className="space-y-4">
          {suggestions.map((s) => (
            <div key={s.title} className="flex gap-3">
              <s.icon className={`mt-0.5 h-4 w-4 shrink-0 ${s.color}`} />
              <div>
                <p className="text-sm font-bold text-foreground">{s.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
