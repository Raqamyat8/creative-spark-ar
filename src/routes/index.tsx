import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Zap, FileText, Video, Target, ArrowLeft } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "هل أداة كوبي مجانية بالكامل؟",
    a: "نعم، أداة كوبي مجانية حاليًا، ومفتوحة لأصحاب المتاجر الإلكترونية العربية لإنشاء أوصاف المنتجات والمحتوى التسويقي باستخدام الذكاء الاصطناعي، وفقًا للميزات المتاحة في الموقع.",
  },
  {
    q: "هل تساعد كوبي في كتابة أوصاف منتجات محسّنة لمحركات البحث (SEO)؟",
    a: "نعم، تم تصميم كوبي لمساعدتك في إنشاء أوصاف منتجات احترافية ومنظمة تساعدك على تحسين جودة محتوى صفحات المنتجات وتهيئتها لمحركات البحث. ومع ذلك، لا تضمن كوبي تصدر نتائج Google، لأن ترتيب نتائج البحث يعتمد على عوامل متعددة مثل جودة الموقع والمحتوى والمنافسة وتجربة المستخدم.",
  },
  {
    q: "هل يمكنني استخدام المحتوى الذي أنشئه كوبي في متجري وحساباتي التسويقية؟",
    a: "نعم، يمكنك نسخ المحتوى الذي تنشئه كوبي واستخدامه في متجرك الإلكتروني وحملاتك التسويقية وحساباتك على منصات التواصل الاجتماعي، مثل سلة وزد وشوبيفاي وتيك توك وإنستقرام، مع مراجعة المحتوى وتعديله بما يناسب منتجك وجمهورك قبل نشره.",
  },
];

export const Route = createFileRoute("/")({
  head: () => {
    const title =
      "كوبي | كاتب أوصاف المنتجات وسكربتات تيك توك بالذكاء الاصطناعي مجاناً";
    const description =
      "أداة كوبي المجانية لكتابة وصف منتجات المتاجر الإلكترونية المتوافق مع السيو، وصناعة سكربتات إعلانات تيك توك وإنستقرام بالذكاء الاصطناعي في ثوانٍ بدون اشتراك.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://creative-spark-ar.lovable.app/" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "https://creative-spark-ar.lovable.app/" }],
    };
  },

  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdSlot id="ad-top-banner" label="مساحة إعلانية — Top Banner" className="py-4" />
      <Hero />
      <Steps />
      <Examples />
      <Testimonials />
      <FinalCta />
      <AdSlot id="ad-bottom-banner" label="مساحة إعلانية — Bottom Banner" className="pb-8" />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-black text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
          كوبي
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground transition">كيف يعمل</a>
          <a href="#examples" className="hover:text-foreground transition">أمثلة</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2">
            دخول
          </Link>
          <Link
            to="/auth/signup"
            className="inline-flex items-center gap-1 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90 transition"
          >
            ابدأ مجاناً
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground shadow-soft">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          مجاني بالكامل · مدعوم بالذكاء الاصطناعي للمتاجر العربية
        </div>
        <h1 className="text-balance text-4xl font-black leading-tight md:text-6xl">
          محتوى تسويقي عالي التحويل
          <br />
          <span className="bg-gradient-to-l from-primary to-primary-glow bg-clip-text text-transparent">
            لمنتجاتك في ثوانٍ
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          الصق رابط منتجك واحصل فوراً على وصف SEO، سكربت فيديو تيك توك، وأفكار إعلانية جاهزة للنشر.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/auth/signup"
            className="group inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-glow hover:opacity-95 transition"
          >
            ابدأ مجاناً — بلا حدود
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          </Link>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-base font-semibold hover:bg-accent transition"
          >
            كيف يعمل
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">مجاني 100% · بدون بطاقة ائتمان · استخدام غير محدود</p>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    { icon: FileText, title: "الصق الرابط", desc: "أدخل رابط المنتج أو اكتب وصفاً بسيطاً بكلمات قليلة." },
    { icon: Sparkles, title: "الذكاء يشتغل", desc: "يحلّل الذكاء الاصطناعي منتجك ويصمّم محتوى مقنعاً." },
    { icon: Zap, title: "انسخ وانشر", desc: "احصل على 3 محتويات جاهزة للنشر مباشرة على متجرك." },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-black md:text-4xl">3 خطوات فقط</h2>
        <p className="mt-2 text-muted-foreground">من الفكرة إلى محتوى جاهز خلال أقل من دقيقة</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="group relative rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="absolute -top-3 left-6 rounded-full gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              خطوة {i + 1}
            </div>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Examples() {
  const cards = [
    {
      icon: FileText,
      title: "وصف منتج SEO",
      body: "اكتشف التصميم الذي يجمع بين الأناقة والوظيفة — قطعة استثنائية تلفت الأنظار وتمنحك ثقة عالية في كل مناسبة…",
    },
    {
      icon: Video,
      title: "سكربت فيديو",
      body: "[0-3ث] وقّف! لو تبحث عن الأفضل، لا تفوت هذا الفيديو — [3-8ث] المشكلة… [8-14ث] الحل…",
    },
    {
      icon: Target,
      title: "أفكار إعلانية",
      body: "1) قبل/بعد على TikTok · 2) شهادة عميل على Instagram · 3) عرض محدود بعدّاد تنازلي…",
    },
  ];
  return (
    <section id="examples" className="border-y border-border bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black md:text-4xl">أمثلة على المحتوى المُنتَج</h2>
          <p className="mt-2 text-muted-foreground">هذا فقط جزء بسيط مما يمكنك الحصول عليه</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold">{c.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "سارة العتيبي", role: "متجر أزياء", quote: "وفّرت عليّ ساعات كل يوم. محتوى احترافي بدون تعب." },
    { name: "خالد الحربي", role: "دروبشيبينج", quote: "زادت مبيعاتي بعدما بديت أستخدم السكربتات في تيك توك." },
    { name: "منى القحطاني", role: "متجر إنستقرام", quote: "أفضل أداة جربتها — بسيطة وسريعة والنتايج ممتازة." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-black md:text-4xl">ماذا يقول عملاؤنا</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <blockquote className="text-sm leading-relaxed">"{t.quote}"</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary font-bold text-primary-foreground">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="text-3xl font-black md:text-5xl">
        جاهز لتوفير ساعات من الكتابة؟
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        انضم لآلاف أصحاب المتاجر الذين يستخدمون كوبي يومياً لإنشاء محتوى يبيع.
      </p>
      <Link
        to="/auth/signup"
        className="mt-8 inline-flex items-center gap-2 rounded-xl gradient-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-glow hover:opacity-95 transition"
      >
        ابدأ مجاناً الآن
        <ArrowLeft className="h-5 w-5" />
      </Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} كوبي — جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
