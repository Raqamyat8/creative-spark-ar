import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const links = [
  { to: "/about", label: "من نحن" },
  { to: "/privacy", label: "سياسة الخصوصية" },
  { to: "/terms", label: "شروط الاستخدام" },
  { to: "/disclaimer", label: "إخلاء المسؤولية" },
  { to: "/contact", label: "اتصل بنا" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 text-base font-black">
              <span className="grid h-7 w-7 place-items-center rounded-lg gradient-primary text-primary-foreground shadow-soft">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              كوبي
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              أداة عربية تساعد أصحاب المتاجر الإلكترونية على إنشاء أوصاف المنتجات
              والمحتوى التسويقي باستخدام الذكاء الاصطناعي.
            </p>
          </div>

          <nav aria-label="روابط الموقع" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} كوبي — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
