"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity, Search, Bell, Settings, User } from "lucide-react"

const navLinks = [
  { label: "Alerts", href: "/nurse-station", active: true },
  { label: "Floor Map", href: "/nurse-station" },
  { label: "Staffing", href: "/dashboard" },
  { label: "Handoff", href: "/dashboard" },
]

export function NurseNavbar() {
  const router = useRouter()
  return (
    <header className="border-b" style={{ borderColor: "var(--nurse-border)", backgroundColor: "var(--nurse-card)" }}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <Link href="/nurse-station" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold" style={{ color: "var(--nurse-foreground)" }}>
              Nurse Station Central
            </span>
          </Link>

          <div className="hidden md:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--nurse-muted-foreground)" }}>
              Current Unit
            </p>
            <p className="text-sm font-bold" style={{ color: "var(--nurse-foreground)" }}>
              ICU - West Wing 4A
            </p>
          </div>

          <div className="hidden items-center gap-1 rounded-lg px-3 py-2 md:flex" style={{ backgroundColor: "var(--nurse-muted)" }}>
            <Search className="h-4 w-4" style={{ color: "var(--nurse-muted-foreground)" }} />
            <input
              type="text"
              placeholder="Search patients or beds..."
              className="w-44 bg-transparent text-sm focus:outline-none"
              style={{ color: "var(--nurse-foreground)" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: link.active ? "#2563eb" : "var(--nurse-muted-foreground)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/nurse-station")}
              className="rounded-lg p-2 transition-colors"
              style={{ color: "var(--nurse-muted-foreground)" }}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="rounded-lg p-2 transition-colors"
              style={{ color: "var(--nurse-muted-foreground)" }}
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </button>
            <button
              onClick={() => router.push("/login")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
              aria-label="User profile"
            >
              <User className="h-4 w-4 text-primary-foreground" />
              <span className="sr-only">User profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
