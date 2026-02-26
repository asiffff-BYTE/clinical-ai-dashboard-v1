import { Shield, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.15)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Now HIPAA Compliant
              </span>
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              AI-Based Clinical Decision Support for{" "}
              <span className="text-primary">Real-Time</span> Risk Prediction
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Revolutionizing ICU monitoring with predictive analytics to
              identify patient risks before they become critical. Empowering
              clinicians with data-driven confidence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <LayoutDashboard className="h-4 w-4" />
                View Live Dashboard
              </Link>
              <Link
                href="#capabilities"
                className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-10">
              <div>
                <p className="text-3xl font-extrabold text-foreground">98%</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Prediction Accuracy
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-foreground">15m+</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Early Warning
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-chart-3" />
                <div className="h-3 w-3 rounded-full bg-chart-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">Patient Risk Score</span>
                  <span className="text-lg font-bold text-destructive">84</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">Heart Rate</span>
                  <span className="text-lg font-bold text-chart-4">112 BPM</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">SpO2</span>
                  <span className="text-lg font-bold text-chart-3">91%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">AI Recommendation</span>
                  <span className="text-sm font-semibold text-primary">Initiate IV Fluids</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
