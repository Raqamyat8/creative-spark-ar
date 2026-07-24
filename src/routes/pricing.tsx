import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "الأسعار — كوبي" },
      { name: "description", content: "خطط أسعار بسيطة وواضحة تناسب حجم متجرك واحتياجاتك." },
      { property: "og:title", content: "الأسعار — كوبي" },
      { property: "og:description", content: "ابدأ مجاناً وارتقِ عند الحاجة." },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  const plans = [
    {
      name: "مجاني",
      price: "0",
      desc: "لتجربة الأداة ورؤية القيمة",
      features: ["5 محتويات مجاناً", "وصف منتج + فيديو + إعلان", "دعم أساسي"],
      cta: "ابدأ مجاناً",
      href: "/auth/signup" as const,
    },
    {
      name: "احترافي",
      price: "49",
      desc: "للمتاجر النشطة",
      highlight: true,
      features: [
        "200 محتوى شهرياً",
        "أولوية في التوليد",
        "تصدير للنصوص",
        "دعم مميز عبر واتساب",
        "قوالب متقدمة",
      ],
      cta: "اشترك الآن",
      href: "/auth/signup" as const,
    },
    {
      name: "الأعمال",
      price: "149",
      desc: "للفرق والوكالات",
      features: [
        "محتوى غير محدود",
        "5 مستخدمين",
        "تكامل API",
        "مدير حساب مخصّص",
      ],
      cta: "تواصل معنا",
      href: "/auth/signup" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-black">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            كوبي
          </Link>
          <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
            دخول
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black md:text-5xl">اختر الخطة المناسبة لك</h1>
          <p className="mt-3 text-muted-foreground">ادفع فقط مقابل ما تحتاج — بدون رسوم خفية.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={
                "relative rounded-2xl border p-8 shadow-soft transition hover:-translate-y-1 " +
                (p.highlight
                  ? "border-primary/40 bg-card shadow-glow"
                  : "border-border bg-card")
              }
            >
              {p.highlight && (
                <div className="absolute -top-3 right-6 rounded-full gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  الأكثر شعبية
                </div>
              )}
              <div className="text-xl font-bold">{p.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-black">{p.price}</span>
                <span className="text-sm text-muted-foreground">ريال / شهر</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={p.href}
                className={
                  "mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition " +
                  (p.highlight
                    ? "gradient-primary text-primary-foreground hover:opacity-95"
                    : "border border-border bg-background hover:bg-accent")
                }
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
