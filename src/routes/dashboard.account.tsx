import { createFileRoute } from "@tanstack/react-router";
import { Mail, User as UserIcon, Zap } from "lucide-react";
import { useAuth } from "@/lib/use-auth";

export const Route = createFileRoute("/dashboard/account")({
  head: () => ({ meta: [{ title: "الحساب — كوبي" }, { name: "description", content: "معلومات حسابك وخطتك." }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user } = useAuth();
  if (!user) return null;


  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black md:text-3xl">الحساب</h1>
        <p className="mt-1 text-sm text-muted-foreground">إدارة معلوماتك وخطتك</p>
      </div>

      <div className="grid gap-5">
        {/* Profile */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full gradient-primary text-xl font-black text-primary-foreground shadow-soft">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-bold">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <InfoRow icon={UserIcon} label="الاسم" value={user.name} />
            <InfoRow icon={Mail} label="البريد" value={user.email} />
          </div>
        </section>

        {/* Plan */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                الخطة الحالية
              </div>
              <div className="mt-1 text-xl font-black">مجاني وغير محدود</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              <Zap className="h-3.5 w-3.5 text-primary" />
              استخدام بلا حدود
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            كل ميزات كوبي متاحة لك مجاناً بالكامل — بدون اشتراكات ولا حدود على عدد المحتويات.
          </p>
        </section>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
