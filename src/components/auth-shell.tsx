import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen gradient-hero" dir="rtl">
      <div className="mx-auto max-w-md px-4 py-10">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 font-black text-lg">
          <span className="grid h-9 w-9 place-items-center rounded-lg gradient-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
          كوبي
        </Link>
        <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
          <h1 className="text-2xl font-black">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}
