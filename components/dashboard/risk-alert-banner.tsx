"use client"

import { AlertTriangle } from "lucide-react"
import { usePatients, hasVitalRisk } from "@/contexts/patient-context"
import { useSettings } from "@/contexts/settings-context"

export function RiskAlertBanner() {
  const { selectedPatient } = usePatients()
  const { alertsEnabled } = useSettings()
  const patientRisk = hasVitalRisk(selectedPatient)

  if (!alertsEnabled || !patientRisk || !selectedPatient) return null

  const o2 = parseInt(selectedPatient.oxygenLevel || "", 10)
  const hr = parseInt(selectedPatient.heartRate || "", 10)
  const parts: string[] = []
  if (!Number.isNaN(o2) && o2 < 90) parts.push(`SpO2 critically low (${o2}%)`)
  if (!Number.isNaN(hr) && hr > 140) parts.push(`Heart rate elevated (${hr} BPM)`)

  return (
    <div className="flex items-center gap-3 rounded-xl border border-destructive bg-destructive/10 px-4 py-3">
      <AlertTriangle className="h-6 w-6 shrink-0 text-destructive" />
      <div className="flex-1">
        <p className="text-sm font-bold text-destructive">
          Risk Alert — {selectedPatient.patientName}
        </p>
        <p className="text-xs text-muted-foreground">{parts.join(" • ")}</p>
      </div>
    </div>
  )
}
