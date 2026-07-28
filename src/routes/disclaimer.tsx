import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, Bullets } from "@/components/legal-page";

const title = "إخلاء المسؤولية | كوبي";
const description =
  "إخلاء مسؤولية كوبي حول المحتوى المُنشأ بالذكاء الاصطناعي: احتمال الأخطاء، ضرورة مراجعة المحتوى، وعدم ضمان نتائج المبيعات أو ترتيب محركات البحث.";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://creative-spark-ar.lovable.app/disclaimer" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://creative-spark-ar.lovable.app/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <PageShell
      title="إخلاء المسؤولية"
      intro="نؤمن بأن الوضوح أهم من الوعود. هذه الصفحة توضّح بدقة ما تفعله كوبي وما لا تضمنه."
    >
      <Section title="المحتوى مُنشأ بالذكاء الاصطناعي">
        <p>
          يعتمد كوبي على نماذج ذكاء اصطناعي لإنشاء النصوص. المخرجات تُنتَج آلياً بناءً على
          ما تدخله، وليست مراجَعة بشرياً قبل عرضها لك.
        </p>
      </Section>

      <Section title="احتمال وجود أخطاء">
        <p>
          قد يتضمن المحتوى الناتج أخطاء لغوية، أو معلومات غير دقيقة عن المنتج، أو صياغات
          غير مناسبة لجمهورك أو لسياسات المنصة التي تنشر فيها.
        </p>
      </Section>

      <Section title="المراجعة قبل النشر مسؤوليتك">
        <p>
          يجب عليك مراجعة كل نص وتعديله والتحقق من صحة أي ادعاء أو مواصفة قبل نشره أو
          استخدامه تجارياً. الاعتماد على المحتوى كما هو دون مراجعة يقع على مسؤوليتك.
        </p>
      </Section>

      <Section title="لا نضمن نتائج تجارية">
        <Bullets
          items={[
            "لا نضمن زيادة المبيعات أو معدلات التحويل أو الزيارات أو الأرباح.",
            "لا نضمن الظهور في الصفحة الأولى أو المركز الأول في نتائج Google.",
            "لا نضمن قبول المحتوى أو أداءه على أي منصة إعلانية.",
          ]}
        />
      </Section>

      <Section title="نتائج محركات البحث تعتمد على عوامل خارجة عن سيطرتنا">
        <p>
          ترتيب صفحات متجرك يتأثر بجودة الموقع وسرعته وسلطته، وحجم المنافسة، وتجربة
          المستخدم، وخوارزميات محركات البحث المتغيّرة. المحتوى الجيد عنصر واحد فقط ضمن هذه
          العوامل.
        </p>
      </Section>

      <Section title="كوبي أداة مساعدة وليست استشارة مهنية">
        <p>
          لا يُعد المحتوى الناتج أو أي معلومة في هذا الموقع استشارة قانونية أو تسويقية أو
          تقنية أو تجارية متخصصة. لاتخاذ قرارات مهمة، استشر مختصاً.
        </p>
      </Section>

      <Section title="روابط وخدمات خارجية">
        <p>
          إذا ظهرت في الموقع روابط أو خدمات لأطراف ثالثة، فنحن لسنا مسؤولين عن محتواها أو
          سياساتها.
        </p>
      </Section>
    </PageShell>
  );
}
