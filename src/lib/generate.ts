// Mock AI content generator. Replace with real AI call later.

export type GeneratedContent = {
  description: string;
  videoScript: string;
  adIdeas: string;
};

function extractName(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "منتجك";
  try {
    const url = new URL(trimmed);
    const seg = url.pathname.split("/").filter(Boolean).pop() ?? "المنتج";
    return decodeURIComponent(seg.replace(/[-_]/g, " ")).slice(0, 40) || "المنتج";
  } catch {
    return trimmed.split(/\s+/).slice(0, 6).join(" ");
  }
}

export async function generateContent(input: string): Promise<GeneratedContent> {
  await new Promise((r) => setTimeout(r, 1600));
  const name = extractName(input);

  const description = `اكتشف ${name} — الحل الذي كنت تبحث عنه لتحويل يومك إلى تجربة استثنائية.

✨ لماذا ${name}؟
• جودة عالية تمنحك ثقة كاملة في كل استخدام
• تصميم أنيق يلفت الأنظار ويعكس ذوقك الرفيع
• عملي وسهل الاستخدام حتى لأول مرة
• قيمة حقيقية بسعر لا يقاوَم

💡 مثالي لكل من يبحث عن الأفضل دون تنازلات.
اطلبه الآن قبل نفاد الكمية — أنت تستحق الأفضل.

الكلمات المفتاحية: ${name}، أفضل ${name}، شراء ${name} أونلاين، عروض ${name}.`;

  const videoScript = `🎬 سكربت فيديو قصير (15-20 ثانية)

[0-3 ثوانٍ — الخطاف]
"وقّف! لو تعبت من ${name} اللي ما يشتغل زي ما تتوقع… شوف هذا."

[3-8 ثوانٍ — المشكلة]
"أغلب المنتجات تعدك بالكثير وتعطيك القليل، والنتيجة إحباط وضياع فلوس."

[8-14 ثانية — الحل]
"${name} صُمّم خصيصاً ليحل هالمشكلة — نتيجة فورية، جودة عالية، وتجربة تخليك ترجع تشتري من جديد."

[14-20 ثانية — دعوة للفعل]
"اطلبه الحين من الرابط بالبايو 👇 والكمية محدودة!"

#تسوق #منتجات #تخفيضات`;

  const adIdeas = `🎯 3 أفكار إعلانية جاهزة

━━━━━━━━━━━━━━━
1) إعلان "قبل / بعد"
• العنوان: "الفرق يتكلم عن نفسه — جرّب ${name}"
• الفكرة البصرية: مقارنة سريعة قبل/بعد بألوان جذابة
• الجمهور: 18-35 سنة، مهتمون بالتسوق أونلاين
• المنصة المقترحة: TikTok + Instagram Reels

━━━━━━━━━━━━━━━
2) إعلان شهادة عميل
• العنوان: "لهذا السبب الكل يطلب ${name}"
• الفكرة البصرية: عميل حقيقي يستخدم المنتج ويشارك انطباعه
• الجمهور: 25-45 سنة، ربّات بيوت + موظفين
• المنصة المقترحة: Instagram Feed + Facebook

━━━━━━━━━━━━━━━
3) إعلان عرض محدود
• العنوان: "خصم 30% على ${name} — لمدة 24 ساعة فقط ⏰"
• الفكرة البصرية: عدّاد تنازلي + صورة منتج بارزة
• الجمهور: عملاء سابقون + مهتمون بالعروض
• المنصة المقترحة: Snapchat + TikTok Ads`;

  return { description, videoScript, adIdeas };
}
