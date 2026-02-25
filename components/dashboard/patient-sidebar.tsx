"use client"

import { ChevronDown, Sparkles } from "lucide-react"

const bedOccupancy = [
  { bed: "01", status: "empty" },
  { bed: "02", status: "empty" },
  { bed: "03", status: "stable" },
  { bed: "04", status: "critical" },
  { bed: "05", status: "empty" },
  { bed: "06", status: "stable" },
  { bed: "07", status: "stable" },
  { bed: "08", status: "empty" },
  { bed: "09", status: "empty" },
  { bed: "10", status: "stable" },
  { bed: "11", status: "stable" },
  { bed: "12", status: "critical" },
]

function getBedColor(status: string) {
  switch (status) {
    case "critical":
      return "bg-destructive text-destructive-foreground"
    case "stable":
      return "bg-chart-2 text-[#050a18]"
    default:
      return "bg-secondary text-muted-foreground"
  }
}

export function PatientSidebar() {
  return (
    <aside className="w-full border-r border-border bg-card p-4 lg:w-64">
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Selected Patient
        </p>
        <button className="flex w-full items-center justify-between rounded-lg border border-border bg-secondary px-3 py-2.5">
          <span className="text-sm font-medium text-foreground">John Doe - Bed 12</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mb-6 rounded-lg border border-border bg-secondary p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">MRN: 12345678 - 64Y Male</p>
          </div>
          <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">
            Critical
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Unit A - Bed Occupancy
        </p>
        <div className="grid grid-cols-4 gap-2">
          {bedOccupancy.map((bed) => (
            <div
              key={bed.bed}
              className={`flex h-10 w-full items-center justify-center rounded-lg text-xs font-bold ${getBedColor(bed.status)}`}
            >
              {bed.bed}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto rounded-lg border border-border bg-secondary p-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            AI Status
          </span>
        </div>
        <p className="mt-1 text-sm text-foreground">System Monitoring Active</p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
          <div className="h-1.5 w-2/3 rounded-full bg-primary" />
        </div>
      </div>
    </aside>
  )
}
