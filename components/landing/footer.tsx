import Link from "next/link"
import { Activity, Globe } from "lucide-react"

const footerLinks = {
  Product: ["Monitoring", "Risk Scoring", "API Docs"],
  Company: ["About Us", "Careers", "Trust Center"],
  Legal: ["Privacy Policy", "HIPAA Compliance", "Terms of Use"],
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">ClinicalAI</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Advanced clinical decision support systems built for the future of
              critical care medicine.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {category}
              </h4>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 ClinicalAI Systems Inc. Empowering clinicians through data.
          </p>
          <div className="flex items-center gap-3">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Website</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
