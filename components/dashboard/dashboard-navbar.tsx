"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity, Search, Bell, Settings, User } from "lucide-react"

const navLinks = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Unit Map", href: "/nurse-station" },
  { label: "Alerts", href: "/nurse-station", badge: 3 },
  { label: "Reports", href: "/architecture" },
]

export function DashboardNavbar() {
  const router = useRouter()
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">ICU Risk Monitor AI</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-lg bg-secondary px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Patient or Bed..."
              className="w-52 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  link.active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="absolute -right-4 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/nurse-station")}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
