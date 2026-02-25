import { FileText, Syringe, TrendingUp, AlertTriangle } from "lucide-react"

const labResults = [
  { label: "WBC Count", value: "18.2", icon: TrendingUp, color: "text-destructive" },
  { label: "Lactate", value: "4.1", icon: AlertTriangle, color: "text-destructive" },
  { label: "Creatinine", value: "1.2", color: "text-foreground" },
  { label: "Glucose", value: "165", color: "text-chart-1" },
]

const infusions = [
  {
    drug: "Norepinephrine",
    dose: "0.05 mcg/kg/min",
    active: true,
    progress: 40,
  },
  {
    drug: "Propofol",
    dose: "20 mcg/kg/min",
    active: true,
    progress: 70,
  },
]

export function LabResults() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Recent Lab Results</h3>
        </div>
        <div className="space-y-3">
          {labResults.map((lab) => (
            <div
              key={lab.label}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <span className="text-sm text-muted-foreground">{lab.label}</span>
              <div className="flex items-center gap-1.5">
                <span className={`text-sm font-bold ${lab.color}`}>{lab.value}</span>
                {lab.icon && <lab.icon className={`h-3.5 w-3.5 ${lab.color}`} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Syringe className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Active Infusions</h3>
        </div>
        <div className="space-y-4">
          {infusions.map((inf) => (
            <div key={inf.drug} className="rounded-lg border border-border bg-secondary p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{inf.drug}</span>
                <span className="text-xs font-medium text-primary">{inf.dose}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-accent">
                <div
                  className="h-1.5 rounded-full bg-primary"
                  style={{ width: `${inf.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
