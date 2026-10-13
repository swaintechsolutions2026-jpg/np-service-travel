import { Plus } from 'lucide-react'
import type { Faq } from '@/data/fixtures'
import { cn } from '@/lib/utils'

export function FAQAccordion({ items, tone = 'dark', className }: { items: Faq[]; tone?: 'dark' | 'light'; className?: string }) {
  return (
    <div className={cn('divide-y', tone === 'light' ? 'divide-white/10' : 'divide-border', className)}>
      {items.map((f) => (
        <details key={f.id} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className={cn('flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[15px] font-semibold sm:text-base', tone === 'light' ? 'text-white' : 'text-navy')}>
            {f.question}
            <span className={cn('grid size-8 shrink-0 place-items-center rounded-full border transition-transform duration-300 group-open:rotate-45', tone === 'light' ? 'border-white/20 text-gold' : 'border-border text-royal')}>
              <Plus className="size-4" />
            </span>
          </summary>
          <p className={cn('-mt-1 pr-12 pb-5 text-[15px] leading-relaxed', tone === 'light' ? 'text-white/70' : 'text-muted-foreground')}>{f.answer}</p>
        </details>
      ))}
    </div>
  )
}

/** FAQPage structured data for the given questions. */
export function faqSchema(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }
}
