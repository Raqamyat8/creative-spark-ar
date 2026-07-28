// Empty placeholder containers for Google AdSense units.
// Drop the AdSense <ins> snippet inside when your account is approved.

export function AdSlot({
  id,
  label,
  className = "",
}: {
  id: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={"mx-auto w-full max-w-6xl px-4 " + className}>
      <div
        id={id}
        data-ad-slot={id}
        aria-label={label}
        className="grid min-h-[90px] w-full place-items-center rounded-2xl border border-dashed border-border bg-secondary/40 text-xs text-muted-foreground md:min-h-[120px]"
      >
        {label}
      </div>
    </div>
  );
}
