const RIBBON_ITEMS = [
  'selected works',
  'full-stack architecture',
  'applied machine learning',
  'computer vision',
  'network intrusion prevention',
  'data analytics & power bi',
];

export function MarqueeStrip() {
  const repeated = [...RIBBON_ITEMS, ...RIBBON_ITEMS];

  return (
    <div
      aria-hidden="true"
      className="no-print overflow-hidden border-b border-zinc-800/80 bg-[#0D0D10] py-3"
    >
      <div className="animate-marquee flex items-center gap-8 text-xs font-medium tracking-wide text-zinc-400">
        {repeated.map((item, idx) => (
          <span key={`${item}-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
            <span>{item}</span>
            <span className="text-[#F2B705]/70">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
