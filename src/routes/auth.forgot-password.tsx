import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [{ title: "استعادة كلمة المرور — كوبي" }, { name: "description", content: "استعد الوصول إلى حسابك." }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      title="نسيت كلمة المرور؟"
      subtitle="أدخل بريدك الإلكتروني وسنرسل لك رابط الاستعادة"
      footer={
        <Link to="/auth/login" className="font-bold text-primary hover:underline">
          العودة إلى تسجيل الدخول
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-primary/30 bg-accent/40 p-4 text-sm">
          تم إرسال رابط الاستعادة إلى بريدك الإلكتروني. تحقق من صندوق الوارد.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("تم إرسال الرابط");
          }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft hover:opacity-95 transition"
          >
            إرسال رابط الاستعادة
          </button>
        </form>
      )}
    </AuthShell>
  );
}
