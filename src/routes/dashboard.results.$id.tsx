import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FileText, Video, Target, Copy, RefreshCw, Check, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/use-auth";
import { getGeneration, saveGeneration, type Generation } from "@/lib/mock-store";
import { generateContent } from "@/lib/generate";

export const Route = createFileRoute("/dashboard/results/$id")({
  head: () => ({ meta: [{ title: "المحتوى المُنشأ — كوبي" }, { name: "description", content: "استعرض المحتوى الذي أنشأه الذكاء الاصطناعي." }] }),
  component: ResultsPage,
});

function ResultsPage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gen, setGen] = useState<Generation | undefined>(() => getGeneration(id));
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGen(getGeneration(id));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [id]);

  if (!gen) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">لم يتم العثور على هذا المحتوى.</p>
        <Link to="/dashboard" className="mt-4 inline-block text-primary hover:underline">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  const update = (patch: Partial<Generation>) => {
    const next = { ...gen, ...patch };
    setGen(next);
    // persist by replacing in list
    const raw = localStorage.getItem("copy_generations");
    const all: Generation[] = raw ? JSON.parse(raw) : [];
    const idx = all.findIndex((x) => x.id === next.id);
    if (idx >= 0) {
      all[idx] = next;
      localStorage.setItem("copy_generations", JSON.stringify(all));
    }
  };

  const regenerateAll = async () => {
    if (!user) return;
    toast.loading("جاري إعادة الإنشاء...", { id: "regen" });
    const out = await generateContent(gen.input);
    update({ ...out });
    toast.success("تم التحديث ✨", { id: "regen" });
  };

  return (
    <div ref={topRef} className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/dashboard" className="hover:text-foreground">لوحة التحكم</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span>النتائج</span>
      </div>

      <div className="mb-6 rounded-2xl border border-primary/30 bg-accent/40 p-4 animate-fade-in-up">
        <div className="flex items-center gap-2 text-sm font-bold text-primary">
          <Check className="h-4 w-4" />
          تم إنشاء المحتوى بنجاح
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          المحتوى مبني على: <span className="font-medium">{gen.input}</span>
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black md:text-3xl">المحتوى الجاهز 🎉</h1>
        <button
          onClick={regenerateAll}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition"
        >
          <RefreshCw className="h-4 w-4" />
          إعادة إنشاء الكل
        </button>
      </div>

      <div className="grid gap-5">
        <ResultCard
          delay={0}
          icon={FileText}
          title="وصف المنتج"
          subtitle="محسّن لمحركات البحث SEO"
          value={gen.description}
          onChange={(v) => update({ description: v })}
          onRegen={async () => {
            const out = await generateContent(gen.input);
            update({ description: out.description });
          }}
        />
        <ResultCard
          delay={100}
          icon={Video}
          title="سكربت فيديو قصير"
          subtitle="جاهز للتيك توك وريلز"
          value={gen.videoScript}
          onChange={(v) => update({ videoScript: v })}
          onRegen={async () => {
            const out = await generateContent(gen.input);
            update({ videoScript: out.videoScript });
          }}
        />
        <ResultCard
          delay={200}
          icon={Target}
          title="أفكار إعلانات"
          subtitle="3 أفكار جاهزة للتنفيذ"
          value={gen.adIdeas}
          onChange={(v) => update({ adIdeas: v })}
          onRegen={async () => {
            const out = await generateContent(gen.input);
            update({ adIdeas: out.adIdeas });
          }}
        />
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-soft hover:opacity-95 transition"
        >
          إنشاء محتوى آخر
        </button>
      </div>
    </div>
  );
}

function ResultCard({
  icon: Icon,
  title,
  subtitle,
  value,
  onChange,
  onRegen,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  value: string;
  onChange: (v: string) => void;
  onRegen: () => Promise<void>;
  delay: number;
}) {
  const [copied, setCopied] = useState(false);
  const [regenLoading, setRegenLoading] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("تم النسخ");
    setTimeout(() => setCopied(false), 1600);
  };

  const regen = async () => {
    setRegenLoading(true);
    try {
      await onRegen();
      toast.success("تم التحديث");
    } catch {
      toast.error("فشل الإنشاء");
    } finally {
      setRegenLoading(false);
    }
  };

  return (
    <div
      className="animate-fade-in-up rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-soft">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold md:text-lg">{title}</h3>
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent transition"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "تم" : "نسخ"}
          </button>
          <button
            onClick={regen}
            disabled={regenLoading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent transition disabled:opacity-60"
          >
            <RefreshCw className={"h-3.5 w-3.5 " + (regenLoading ? "animate-spin" : "")} />
            {regenLoading ? "جاري..." : "إعادة"}
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(20, Math.max(6, value.split("\n").length + 1))}
        className="w-full resize-y rounded-xl border border-input bg-background p-4 text-sm leading-relaxed outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
