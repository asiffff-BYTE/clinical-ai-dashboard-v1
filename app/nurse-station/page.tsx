import { NurseNavbar } from "@/components/nurse-station/nurse-navbar"
import { AlertCards } from "@/components/nurse-station/alert-cards"
import { PatientGrid } from "@/components/nurse-station/patient-grid"
import Link from "next/link"

export const metadata = {
  title: "Nurse Station Central - ClinicalAI",
  description: "Real-time alerts and high-risk patient monitoring for nursing staff.",
}

export default function NurseStationPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--nurse-background)", color: "var(--nurse-foreground)" }}>
      <NurseNavbar />

      <main className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            <AlertCards />
            <PatientGrid />
          </div>
        </div>
      </main>

      {/* Status Bar */}
      <footer className="border-t px-6 py-3" style={{ borderColor: "var(--nurse-border)", backgroundColor: "var(--nurse-card)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#10b981" }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#10b981" }} />
              AI Engine: Connected
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#10b981" }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#10b981" }} />
              Vital Feed: Live (1.2s delay)
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{ color: "var(--nurse-muted-foreground)" }}>
            <span className="font-mono">System Time: 14:32:05 EST</span>
            <Link href="#" className="flex items-center gap-1 font-medium hover:underline">
              Support Center
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
