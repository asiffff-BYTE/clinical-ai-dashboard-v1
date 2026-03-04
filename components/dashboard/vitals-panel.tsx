"use client"

import { Heart, Wind, Thermometer, Droplets } from "lucide-react"
import { usePatients, hasVitalRisk } from "@/contexts/patient-context"

function getVitalColor(
  label: string,
  value: string | number,
  patientRisk: boolean
): string {
  if (patientRisk) {
    if (label === "SPO2") {
      const o2 = typeof value === "string" ? parseInt(value, 10) : value
      if (!Number.isNaN(o2) && o2 < 90) return "text-destructive"
    }
    if (label === "Heart Rate") {
      const hr = typeof value === "string" ? parseInt(value, 10) : value
      if (!Number.isNaN(hr) && hr > 110) return "text-destructive"
    }
  }
  return "text-foreground"
}

export function VitalsPanel() {
  const { selectedPatient } = usePatients()
  const patientRisk = hasVitalRisk(selectedPatient)

  const hr = selectedPatient?.heartRate || "112"
  const bp = selectedPatient?.bloodPressure || "94/62"
  const o2 = selectedPatient?.oxygenLevel || "91"
  const temp = "38.9" // Not in form, keep default

  const vitals = [
    {
      label: "Heart Rate",
      value: hr,
      unit: "BPM",
      icon: Heart,
      iconColor: getVitalColor("Heart Rate", hr, patientRisk),
      bars: patientRisk && parseInt(hr, 10) > 110
        ? ["bg-destructive", "bg-destructive", "bg-destructive", "bg-destructive"]
        : ["bg-chart-3", "bg-chart-3", "bg-destructive", "bg-destructive"],
    },
    {
      label: "BP (SYS/DIA)",
      value: bp,
      unit: "mmHg",
      icon: Wind,
      iconColor: "text-primary",
      bars: ["bg-primary", "bg-primary", "bg-primary", "bg-chart-5"],
    },
    {
      label: "SPO2",
      value: o2,
      unit: "%",
      icon: Droplets,
      iconColor: getVitalColor("SPO2", o2, patientRisk),
      bars: patientRisk && parseInt(o2, 10) < 90
        ? ["bg-destructive", "bg-destructive", "bg-destructive", "bg-destructive"]
        : ["bg-chart-2", "bg-chart-2", "bg-primary", "bg-chart-5"],
    },
    {
      label: "TEMP",
      value: temp,
      unit: "\u00b0C",
      icon: Thermometer,
      iconColor: "text-chart-3",
      bars: ["bg-chart-3", "bg-chart-3", "bg-chart-3", "bg-chart-3"],
    },
  ]

  return (
    <div>
      {selectedPatient && (
        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          Monitoring: <span className="text-foreground">{selectedPatient.patientName}</span>
        </p>
      )}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {vitals.map((vital) => (
        <div
          key={vital.label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {vital.label}
            </p>
            <vital.icon className={`h-4 w-4 ${vital.iconColor}`} />
          </div>
          <p className="text-3xl font-extrabold text-foreground">
            {vital.value}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              {vital.unit}
            </span>
          </p>
          <div className="mt-3 flex gap-1">
            {vital.bars.map((color, i) => (
              <div
                key={i}
                className={`h-3 flex-1 rounded-sm ${color}`}
              />
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
