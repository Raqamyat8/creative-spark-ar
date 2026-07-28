import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-black">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground shadow-soft">
              <Sparkles className="h-4 w-4" />
            </span>
            كوبي
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            الرئيسية
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h1 className="text-3xl font-black md:text-4xl">{title}</h1>
        {intro ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
        ) : null}
        <div className="mt-10 space-y-8">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-lg font-bold md:text-xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-disc space-y-2">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
