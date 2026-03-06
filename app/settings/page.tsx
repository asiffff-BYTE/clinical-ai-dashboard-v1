"use client"

import { Bell, Server, User } from "lucide-react"
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { PatientSidebar } from "@/components/dashboard/patient-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useSettings } from "@/contexts/settings-context"

export default function SettingsPage() {
  const { alertsEnabled, setAlertsEnabled } = useSettings()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardNavbar />
      <div className="flex flex-1 flex-col lg:flex-row">
        <PatientSidebar />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure alert thresholds, system options, and user preferences.
              </p>
            </div>

            {/* Alert Settings */}
            <Card className="rounded-xl border border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Bell className="h-5 w-5 text-primary" />
                  Alert Settings
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Control critical alert notifications for patient vitals.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Enable Alerts
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Show risk alert banners when vitals reach critical levels
                    </p>
                  </div>
                  <Switch
                    checked={alertsEnabled}
                    onCheckedChange={setAlertsEnabled}
                  />
                </div>
                <div className="rounded-lg border border-border bg-secondary px-4 py-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Current Risk Thresholds
                  </p>
                  <div className="space-y-2 text-sm text-foreground">
                    <p>
                      <span className="font-medium">SpO2:</span> Normal &gt;95%,
                      Warning 90–95%, Critical &lt;90%
                    </p>
                    <p>
                      <span className="font-medium">Heart Rate:</span> Warning
                      &gt;120 BPM, Critical &gt;140 BPM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card className="rounded-xl border border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Server className="h-5 w-5 text-primary" />
                  System Settings
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Data refresh and AI model configuration.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    Data Refresh Rate
                  </p>
                  <span className="text-sm font-mono text-muted-foreground">
                    1 second
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    AI Model
                  </p>
                  <span className="text-sm font-mono text-muted-foreground">
                    Random Forest
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* User Settings */}
            <Card className="rounded-xl border border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <User className="h-5 w-5 text-primary" />
                  User Settings
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Current user profile and role.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    Username
                  </p>
                  <span className="text-sm text-muted-foreground">
                    Dr. Meena Kulkarni
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">Role</p>
                  <span className="text-sm text-muted-foreground">Doctor</span>
                </div>
              </CardContent>
            </Card>
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
          <span>User: Dr. Meena Kulkarni</span>
          <span className="font-mono font-bold text-foreground">14:28:42</span>
        </div>
      </footer>
    </div>
  )
}
