"use client"

import Link from "next/link"
import { Sparkles, Search, User } from "lucide-react"

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Patient List", href: "#" },
  { label: "Architecture", href: "/architecture", active: true },
  { label: "Settings", href: "#" },
]

export function ArchNavbar() {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Link href="/architecture" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">Clinical AI Dashboard</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1 rounded-lg bg-secondary px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search system docs..."
              className="w-40 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <User className="h-4 w-4 text-primary-foreground" />
            <span className="sr-only">User profile</span>
          </button>
        </div>
      </div>
    </header>
  )
}
