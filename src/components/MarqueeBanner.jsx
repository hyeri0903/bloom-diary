const ITEMS = [
  'BLOOM DIARY',
  'WRITE IN ENGLISH',
  'AI PROOFREAD',
  'GRAMMAR CHECK',
  'VOCABULARY BOOST',
  'LEVEL UP YOUR WRITING',
  'B1 · B2 · C1 · C2',
]

const ticker = ITEMS.map((item) => `· ${item} `).join('')

export default function MarqueeBanner() {
  return (
    <div className="bg-bloom-ink border-b-2 border-bloom-ink overflow-hidden py-2.5 select-none">
      <div className="flex w-max animate-marquee">
        <span className="font-display text-bloom-bg text-xs uppercase tracking-[0.18em] pr-4 whitespace-nowrap">
          {ticker}
        </span>
        <span className="font-display text-bloom-bg text-xs uppercase tracking-[0.18em] pr-4 whitespace-nowrap" aria-hidden>
          {ticker}
        </span>
      </div>
    </div>
  )
}
