import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, ChevronLeft, FileText } from "lucide-react";
import { useAuth } from "@/lib/use-auth";
import { listGenerations, type Generation } from "@/lib/mock-store";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({ meta: [{ title: "السجل — كوبي" }, { name: "description", content: "استعرض كل محتوى قمت بإنشائه." }] }),
  component: HistoryPage,
});

function HistoryPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Generation[]>([]);

  useEffect(() => {
    if (user) setItems(listGenerations(user.id));
  }, [user]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black md:text-3xl">سجل الإنشاءات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          كل المحتوى الذي قمت بإنشائه في مكان واحد
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full gradient-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold">لم تقم بإنشاء أي محتوى بعد</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ابدأ رحلتك الآن وأنشئ محتوى منتجك الأول
          </p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft hover:opacity-95 transition"
          >
            أنشئ محتواك الأول
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((g) => (
            <li key={g.id}>
              <Link
                to="/dashboard/results/$id"
                params={{ id: g.id }}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-soft"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{g.input}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(g.createdAt).toLocaleString("ar")}
                    </div>
                  </div>
                </div>
                <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:-translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
