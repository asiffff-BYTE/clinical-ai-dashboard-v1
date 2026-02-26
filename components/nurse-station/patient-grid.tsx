"use client"

import { Plus } from "lucide-react"

interface PatientCard {
  bed: string
  name: string
  diScore: number
  vitals: { label: string; value: string }[]
  scoreColor: string
}

const patients: PatientCard[] = [
  {
    bed: "Bed 04",
    name: "Amit Patel",
    diScore: 84,
    scoreColor: "#ef4444",
    vitals: [
      { label: "SPO2", value: "88%" },
      { label: "RESP RATE", value: "24 BPM" },
    ],
  },
  {
    bed: "Bed 12",
    name: "Priya Verma",
    diScore: 62,
    scoreColor: "#f59e0b",
    vitals: [
      { label: "HEART RATE", value: "115" },
      { label: "TEMP", value: "38.9\u00b0C" },
    ],
  },
  {
    bed: "Bed 09",
    name: "Vikram Desai",
    diScore: 78,
    scoreColor: "#ef4444",
    vitals: [
      { label: "MAP", value: "62 MMHG" },
      { label: "UOP", value: "0.4 ML/KG/HR" },
    ],
  },
  {
    bed: "Bed 21",
    name: "Ananya Iyer",
    diScore: 45,
    scoreColor: "#f59e0b",
    vitals: [
      { label: "HR", value: "82" },
      { label: "SPO2", value: "98%" },
    ],
  },
  {
    bed: "Bed 03",
    name: "Suresh Nair",
    diScore: 38,
    scoreColor: "#10b981",
    vitals: [
      { label: "MAP", value: "78" },
      { label: "WBC", value: "11.2" },
    ],
  },
]

export function PatientGrid() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--nurse-foreground)" }}>
            High-Risk Patient Grid
          </h2>
          <p className="text-sm" style={{ color: "var(--nurse-muted-foreground)" }}>
            Priority monitoring based on Deterioration Index (DI)
          </p>
        </div>
        <div className="flex rounded-lg border" style={{ borderColor: "var(--nurse-border)" }}>
          <button className="rounded-l-lg px-3 py-1.5 text-xs font-semibold" style={{ backgroundColor: "var(--nurse-muted)", color: "var(--nurse-foreground)" }}>
            Grid
          </button>
          <button className="rounded-r-lg px-3 py-1.5 text-xs font-semibold" style={{ color: "var(--nurse-muted-foreground)" }}>
            List
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {patients.map((patient) => (
          <div
            key={patient.bed}
            className="rounded-xl border p-4"
            style={{ borderColor: "var(--nurse-border)", backgroundColor: "var(--nurse-card)" }}
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-base font-bold" style={{ color: "#2563eb" }}>
                  {patient.bed}
                </p>
                <p className="text-sm" style={{ color: "#2563eb" }}>
                  {patient.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--nurse-muted-foreground)" }}>
                  DI Score
                </p>
                <p className="text-3xl font-extrabold" style={{ color: patient.scoreColor }}>
                  {patient.diScore}
                </p>
              </div>
            </div>

            <div className="mb-3 space-y-2">
              {patient.vitals.map((v) => (
                <div key={v.label} className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase" style={{ color: "var(--nurse-muted-foreground)" }}>
                    {v.label}
                  </span>
                  <span className="text-sm font-bold" style={{ color: "var(--nurse-foreground)" }}>
                    {v.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini sparkline placeholder */}
            <div className="mb-3 h-8 w-full rounded" style={{ backgroundColor: "var(--nurse-muted)" }}>
              <svg className="h-full w-full" viewBox="0 0 200 32" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke={patient.scoreColor}
                  strokeWidth="2"
                  points="0,20 20,18 40,22 60,16 80,24 100,14 120,20 140,18 160,22 180,16 200,20"
                />
              </svg>
            </div>

            <button
              className="w-full rounded-lg border py-2 text-sm font-semibold transition-colors"
              style={{ borderColor: "var(--nurse-border)", color: "var(--nurse-foreground)" }}
            >
              Full Vitals
            </button>
          </div>
        ))}

        {/* Add Priority Watch Card */}
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8"
          style={{ borderColor: "var(--nurse-border)" }}
        >
          <button className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "var(--nurse-muted)" }}>
            <Plus className="h-6 w-6" style={{ color: "var(--nurse-muted-foreground)" }} />
          </button>
          <p className="mt-3 text-sm font-medium" style={{ color: "var(--nurse-muted-foreground)" }}>
            Add Priority Watch
          </p>
        </div>
      </div>
    </div>
  )
}
