import { cn } from '@/lib/utils'

/**
 * NP Service monogram: bold italic "NP" with an orbiting swoosh and plane, matching the
 * mark on the office signage and coach livery. Replace with the original vector file once supplied.
 */
export function Logo({ tone = 'light', className, compact = false }: { tone?: 'light' | 'dark'; className?: string; compact?: boolean }) {
  const ink = tone === 'light' ? '#ffffff' : '#174985'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 76 48" className="h-9 w-auto shrink-0 sm:h-10" aria-hidden="true">
        <path d="M4 34c14 12 48 12 64-20" fill="none" stroke="#08afa5" strokeWidth="3.2" strokeLinecap="round" />
        <text x="35" y="34" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="31" letterSpacing="-1.5" fill={ink}>
          NP
        </text>
        <path d="M63 6.5l10-3.2-2.6 2.9 3.6 2.4-1.6.7-3.8-1.6-3 3.4-.9-.4 1.4-3.6z" fill="#f5b829" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn('text-[17px] font-extrabold tracking-[0.06em] sm:text-lg', tone === 'light' ? 'text-white' : 'text-royal')}>NP SERVICE</span>
          <span className={cn('mt-1 text-[10px] font-semibold uppercase tracking-[0.32em]', tone === 'light' ? 'text-white/70' : 'text-muted-foreground')}>
            Tour &amp; Travels
          </span>
        </span>
      )}
    </span>
  )
}
