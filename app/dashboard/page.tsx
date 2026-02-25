import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { PatientSidebar } from "@/components/dashboard/patient-sidebar"
import { VitalsPanel } from "@/components/dashboard/vitals-panel"
import { HemodynamicChart } from "@/components/dashboard/hemodynamic-chart"
import { LabResults } from "@/components/dashboard/lab-results"
import { RiskPanel } from "@/components/dashboard/risk-panel"

export const metadata = {
  title: "ICU Dashboard - ClinicalAI",
  description: "Real-time ICU patient monitoring and risk assessment dashboard.",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardNavbar />
      <div className="flex flex-1 flex-col lg:flex-row">
        <PatientSidebar />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row">
            <div className="flex-1 space-y-4">
              <VitalsPanel />
              <HemodynamicChart />
              <LabResults />
            </div>
            <RiskPanel />
          </div>
        </main>
      </div>

      {/* Status Bar */}
      <footer className="flex items-center justify-between border-t border-border bg-card px-6 py-2">
        <div className="flex items-center gap-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            System Health: Optimal
          </span>
          <span className="flex items-center gap-1.5 text-xs text-chart-2">
            <span className="h-2 w-2 rounded-full bg-chart-2" />
            Live Sync Active
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <span>Unit: MICU-A4</span>
          <span>User: Dr. Sarah Williams</span>
          <span className="font-mono font-bold text-foreground">14:28:42</span>
        </div>
      </footer>
    </div>
  )
}
