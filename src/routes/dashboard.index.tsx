import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowLeft, Zap, FileText, Video, Target, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/use-auth";
import { generateContent } from "@/lib/generate";
import { listGenerations, saveGeneration, type Generation } from "@/lib/mock-store";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<Generation[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const refresh = () => setRecent(listGenerations(user.id).slice(0, 5));
    refresh();
    window.addEventListener("gen-change", refresh);
    return () => window.removeEventListener("gen-change", refresh);
  }, [user]);

  if (!user) return null;

  const onGenerate = async () => {
    if (!input.trim()) {
      toast.error("الرجاء إدخال رابط أو وصف للمنتج");
      return;
    }
    setLoading(true);
    try {
      const output = await generateContent(input);
      const gen: Generation = {
        id: crypto.randomUUID(),
        userId: user.id,
        input,
        productUrl: /^https?:\/\//i.test(input.trim()) ? input.trim() : undefined,
        description: output.description,
        videoScript: output.videoScript,
        adIdeas: output.adIdeas,
        createdAt: new Date().toISOString(),
      };
      saveGeneration(gen);
      toast.success("تم إنشاء المحتوى بنجاح ✨");
      navigate({ to: "/dashboard/results/$id", params: { id: gen.id } });
    } catch {
      toast.error("حدث خطأ ما. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            أنشئ محتوى منتجك بالذكاء الاصطناعي
          </div>
          <h1 className="text-2xl font-black md:text-4xl">ماذا نُنشئ اليوم؟</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            الصق رابط المنتج أو اكتب وصفاً بسيطاً
          </p>
        </div>

        <div className="mt-6">
          <div ref={resultsRef} />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="الصق رابط المنتج أو اكتب وصف بسيط..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-input bg-background p-5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          />
          <button
            onClick={onGenerate}
            disabled={loading || !input.trim()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl gradient-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
          >
            {loading ? (
              <>
                <Sparkles className="h-5 w-5 animate-pulse" />
                جاري إنشاء محتوى احترافي لك...
              </>
            ) : (
              <>
                إنشاء المحتوى الآن
                <Zap className="h-5 w-5" />
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            مجاني بالكامل · عدد غير محدود من عمليات التوليد
          </p>
        </div>

        {loading && (
          <div className="mt-6 grid gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 animate-shimmer rounded-xl" />
            ))}
          </div>
        )}
      </section>

      {/* Recent */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">آخر عمليات الإنشاء</h2>
          {recent.length > 0 && (
            <Link to="/dashboard/history" className="text-sm text-primary hover:underline">
              عرض الكل
            </Link>
          )}
        </div>
        {recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground">لم تقم بإنشاء أي محتوى بعد</p>
            <p className="mt-1 text-xs text-muted-foreground">
              اكتب وصف منتجك في الأعلى واضغط إنشاء 👆
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recent.map((g) => (
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
                  <ChevronLeft className="h-4 w-4 text-muted-foreground transition group-hover:-translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Feature icons */}
      <div className="mt-10 grid grid-cols-3 gap-3">
        {[
          { icon: FileText, label: "وصف SEO" },
          { icon: Video, label: "سكربت فيديو" },
          { icon: Target, label: "أفكار إعلانات" },
        ].map((f) => (
          <div key={f.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <div className="mx-auto mb-1.5 grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <f.icon className="h-4 w-4" />
            </div>
            <div className="text-xs font-medium">{f.label}</div>
          </div>
        ))}
      </div>

      {/* Hidden until first result — kept as visual anchor */}
      <div aria-hidden className="sr-only">
        <ArrowLeft />
      </div>
    </div>
  );
}
