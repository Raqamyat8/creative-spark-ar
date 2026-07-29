import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { PageShell, Section } from "@/components/legal-page";

const title = "اتصل بنا | كوبي";
const description =
  "تواصل مع فريق كوبي عبر البريد الإلكتروني remlemehmoud@gmail.com لأي استفسار أو ملاحظة أو اقتراح حول الأداة.";
const EMAIL = "remlemehmoud@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ai-product-description-mu.vercel.app/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ai-product-description-mu.vercel.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`رسالة من ${name || "زائر"} — كوبي`);
    const body = encodeURIComponent(
      `الاسم: ${name}\nالبريد: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <PageShell
      title="اتصل بنا"
      intro="يسعدنا سماع رأيك. سواء كان لديك سؤال أو ملاحظة أو اقتراح لتحسين كوبي، راسلنا ونحاول الرد بأسرع وقت ممكن."
    >
      <Section title="البريد الإلكتروني الرسمي">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-base font-bold text-primary transition hover:bg-accent"
        >
          <Mail className="h-4 w-4" />
          {EMAIL}
        </a>
        <p>اضغط على البريد أعلاه لفتح تطبيق البريد لديك مباشرة.</p>
      </Section>

      <Section title="نموذج التواصل">
        <p>
          يفتح هذا النموذج تطبيق البريد الإلكتروني على جهازك مع رسالة جاهزة، ثم ترسلها
          بنفسك. لا يتم إرسال أي رسالة تلقائياً من الموقع.
        </p>
        <form onSubmit={onSubmit} className="mt-4 space-y-4 text-foreground">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              الاسم
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              الرسالة
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full resize-y rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-soft transition hover:opacity-95 sm:w-auto"
          >
            فتح البريد وإرسال الرسالة
          </button>
        </form>
      </Section>
    </PageShell>
  );
}
