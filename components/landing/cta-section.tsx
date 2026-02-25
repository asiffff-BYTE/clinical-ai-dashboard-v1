import Link from "next/link"

export function CtaSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-primary/10 border border-primary/20 px-8 py-16 text-center md:px-16">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Empower Your Clinical Team Today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Join leading medical centers using AI to improve patient outcomes and
            reduce clinician burnout. Seamlessly integrates with Epic, Cerner,
            and Meditech.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started Now
            </Link>
            <Link
              href="#"
              className="rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Schedule a Technical Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
