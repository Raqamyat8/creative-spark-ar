import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/mock-store";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "تسجيل الدخول — كوبي" }, { name: "description", content: "سجّل دخولك إلى حسابك في كوبي." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    try {
      login(String(data.get("email")), String(data.get("password")));
      toast.success("تم تسجيل الدخول");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="أهلاً بعودتك 👋"
      subtitle="سجّل الدخول للاستمرار في إنشاء المحتوى"
      footer={
        <>
          ليس لديك حساب؟{" "}
          <Link to="/auth/signup" className="font-bold text-primary hover:underline">
            أنشئ حساباً مجانياً
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">كلمة المرور</Label>
            <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <Input id="password" name="password" type="password" required minLength={4} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-xl gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </AuthShell>
  );
}
