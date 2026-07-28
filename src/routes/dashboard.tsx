import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, History, User as UserIcon, LogOut, Sparkles, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/use-auth";
import { logout } from "@/lib/mock-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "لوحة التحكم — كوبي" }, { name: "description", content: "أنشئ وأدر محتوى منتجاتك." }] }),
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/history", label: "السجل", icon: History },
  { to: "/dashboard/account", label: "الحساب", icon: UserIcon },
] as const;

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, ready } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/auth/login" });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center text-muted-foreground text-sm">
        جاري التحميل...
      </div>
    );
  }

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside
          className={
            "fixed inset-y-0 right-0 z-40 w-64 shrink-0 border-l border-sidebar-border bg-sidebar transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 " +
            (open ? "translate-x-0" : "translate-x-full md:translate-x-0")
          }
        >
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5 font-black">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground shadow-soft">
              <Sparkles className="h-4 w-4" />
            </span>
            كوبي
          </div>
          <nav className="p-3">
            {nav.map((item) => {
              const active = isActive(item.to, "exact" in item ? item.exact : false);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={
                    "mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition " +
                    (active
                      ? "gradient-primary text-primary-foreground shadow-soft"
                      : "text-sidebar-foreground hover:bg-sidebar-accent")
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute inset-x-3 bottom-3">
            <div className="rounded-xl border border-sidebar-border bg-card p-4 text-center">
              <div className="text-sm font-bold text-primary">مجاني وغير محدود</div>
              <div className="mt-1 text-xs text-muted-foreground">أنشئ محتوى بلا قيود</div>
            </div>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-foreground/20 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur">
            <button
              className="rounded-lg border border-border p-2 md:hidden"
              onClick={() => setOpen(true)}
              aria-label="القائمة"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="hidden md:block text-sm text-muted-foreground">
              مرحباً {user.name} 👋
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-primary" />
                مجاني وغير محدود
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
                className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition"
                aria-label="تسجيل الخروج"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </header>

          <main className="min-w-0 flex-1 p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
