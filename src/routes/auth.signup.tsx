import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/mock-store";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [{ title: "إنشاء حساب — كوبي" }, { name: "description", content: "أنشئ حساباً مجانياً وابدأ في توليد محتوى تسويقي." }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    try {
      signup(String(data.get("email")), String(data.get("password")), String(data.get("name")));
      toast.success("تم إنشاء حسابك بنجاح 🎉");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="أنشئ حسابك المجاني"
      subtitle="5 محتويات مجانية بدون الحاجة لبطاقة ائتمان"
      footer={
        <>
          لديك حساب بالفعل؟{" "}
          <Link to="/auth/login" className="font-bold text-primary hover:underline">
            سجّل الدخول
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">الاسم</Label>
          <Input id="name" name="name" required placeholder="اسمك الكامل" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input id="password" name="password" type="password" required minLength={4} placeholder="على الأقل 4 حروف" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-xl gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "جاري الإنشاء..." : "أنشئ حسابي"}
        </button>
      </form>
    </AuthShell>
  );
}
