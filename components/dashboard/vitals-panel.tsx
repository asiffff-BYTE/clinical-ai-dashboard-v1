import { Heart, Wind, Thermometer, Droplets } from "lucide-react"

const vitals = [
  {
    label: "Heart Rate",
    value: "112",
    unit: "BPM",
    icon: Heart,
    iconColor: "text-destructive",
    bars: ["bg-chart-3", "bg-chart-3", "bg-destructive", "bg-destructive"],
  },
  {
    label: "BP (SYS/DIA)",
    value: "94/62",
    unit: "mmHg",
    icon: Wind,
    iconColor: "text-primary",
    bars: ["bg-primary", "bg-primary", "bg-primary", "bg-chart-5"],
  },
  {
    label: "SPO2",
    value: "91",
    unit: "%",
    icon: Droplets,
    iconColor: "text-chart-2",
    bars: ["bg-chart-2", "bg-chart-2", "bg-primary", "bg-chart-5"],
  },
  {
    label: "TEMP",
    value: "38.9",
    unit: "\u00b0C",
    icon: Thermometer,
    iconColor: "text-chart-3",
    bars: ["bg-chart-3", "bg-chart-3", "bg-chart-3", "bg-chart-3"],
  },
]

export function VitalsPanel() {
  return (
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
  )
}
