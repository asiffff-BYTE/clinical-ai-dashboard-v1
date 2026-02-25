import { ArchNavbar } from "@/components/architecture/arch-navbar"
import {
  Download,
  Target,
  Zap,
  Database,
  Brain,
  ExternalLink,
  Monitor,
  Server,
  Cloud,
  CreditCard,
  Shield,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    label: "Model Accuracy",
    value: "94.5%",
    change: "+1.2%",
    icon: Target,
    description: "Validated against historical EHR data",
  },
  {
    label: "Inference Latency",
    value: "< 200ms",
    icon: Zap,
    description: "P99 response time on edge nodes",
  },
  {
    label: "Training Corpus",
    value: "1.2M+",
    icon: Database,
    description: "Anonymized clinical patient records",
  },
]

const featureImportance = [
  { label: "Oxygen Saturation (SpO2)", value: 42 },
  { label: "Heart Rate Variability", value: 28 },
  { label: "Creatinine Levels", value: 15 },
]

const techStack = [
  {
    title: "Frontend Dashboard",
    icon: Monitor,
    color: "border-border",
    items: ["React/Tailwind UI", "WebGL Visualizations", "WebSocket Real-time Feed"],
  },
  {
    title: "Backend AI Engine",
    icon: Server,
    color: "border-primary",
    highlight: true,
    items: ["Python / FastAPI", "Scikit-Learn Model", "HL7/FHIR Integration"],
  },
  {
    title: "Cloud Infrastructure",
    icon: Cloud,
    color: "border-border",
    items: ["HIPAA-Compliant AWS", "Kubernetes Orchestration", "AES-256 Data At Rest"],
  },
]

const businessModel = [
  {
    icon: CreditCard,
    title: "SaaS Subscription",
    description:
      "Tiered monthly pricing based on bed count or daily active patients, inclusive of all updates and security patches.",
  },
  {
    icon: Shield,
    title: "Enterprise Licensing",
    description:
      "Custom annual licenses for large health networks requiring on-premise AI deployments and deep EHR integration.",
  },
  {
    icon: TrendingUp,
    title: "Scalability Benefits",
    description:
      "Auto-scaling infrastructure ensures zero downtime during peak hospital admission hours and seasonal surges.",
  },
]

export const metadata = {
  title: "Architecture - ClinicalAI",
  description: "AI Model & System Architecture for Real-Time Patient Risk Prediction.",
}

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background">
      <ArchNavbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span>System Settings</span>
          <span>{">"}</span>
          <span className="text-primary">AI Model & Architecture</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              AI Model & System Architecture
            </h1>
            <p className="mt-2 text-muted-foreground">
              Technical breakdown of the Real-Time Patient Risk Prediction engine
              powered by ensemble learning.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Export Tech Specs
          </button>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-foreground">{stat.value}</p>
                {stat.change && (
                  <span className="text-sm font-semibold text-chart-2">
                    {"~"}{stat.change}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Model Logic */}
        <div className="mb-10">
          <div className="mb-6 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Model Logic: Random Forest Classifier
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              {/* Decision Strategy */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-primary">Decision Strategy</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our system utilizes a Random Forest ensemble method consisting of
                  500 decision trees. This approach reduces overfitting and handles
                  non-linear relationships between clinical variables like vitals,
                  lab results, and patient history.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Gini Impurity", "Feature Bagging", "SHAP Explainability"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Feature Importance */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-sm font-bold text-primary">
                  Feature Importance Rank
                </h3>
                <div className="space-y-3">
                  {featureImportance.map((feat) => (
                    <div key={feat.label}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                          {feat.label}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {feat.value}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${feat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prediction Flow */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                <Brain className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Prediction Flow Visualization
              </h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Interactive model explorer: select a node to view branch
                probability and feature weights.
              </p>
              <Link
                href="#"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline underline-offset-4"
              >
                Launch Explorer
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="mb-10">
          <div className="mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Technical Architecture
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {techStack.map((stack) => (
              <div
                key={stack.title}
                className={`rounded-xl border bg-card p-6 ${
                  stack.highlight
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
                    stack.highlight ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <stack.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className={`text-lg font-bold ${stack.highlight ? "text-primary" : "text-foreground"}`}>
                  {stack.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {stack.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Commercialization */}
        <div className="mb-10">
          <div className="mb-6 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Commercialization & Business Model
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {businessModel.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mb-10 rounded-2xl bg-primary/10 border border-primary/20 px-8 py-10 md:flex md:items-center md:justify-between md:px-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Ready to implement clinical AI?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our technical team provides full integration support with EPIC,
              Cerner, and Meditech systems.
            </p>
          </div>
          <div className="mt-4 flex gap-3 md:mt-0">
            <button className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
              Schedule Technical Demo
            </button>
            <button className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
              Review API Docs
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Clinical AI v2.4.0 Engine</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">HIPAA Compliance</Link>
            <Link href="#" className="hover:text-foreground">Technical Support</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Clinical Analytics Systems, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
