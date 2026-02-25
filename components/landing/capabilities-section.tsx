import { BarChart3, Brain, Bell } from "lucide-react"

const capabilities = [
  {
    icon: BarChart3,
    title: "Real-time monitoring",
    description:
      "Continuous high-frequency data streaming from bedside devices for instantaneous physiological analysis.",
  },
  {
    icon: Brain,
    title: "AI Risk Classification",
    description:
      "Deep learning models categorize patient risk levels into prioritized tiers, highlighting decompensation markers.",
  },
  {
    icon: Bell,
    title: "Intelligent Alerts",
    description:
      "Smart notifications that filter noise and prioritize critical changes, reducing alarm fatigue for nursing staff.",
  },
]

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Platform Capabilities
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
          Advanced Monitoring & Intelligent Automation
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Our system integrates seamlessly with major hospital EHRs to provide
          actionable, real-time insights that save lives.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:bg-secondary"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <cap.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{cap.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
