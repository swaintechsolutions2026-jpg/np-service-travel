import { Info } from 'lucide-react'
import { PageHero } from './PageHero'

export function PolicyLayout({ eyebrow, title, intro, notice, children }: { eyebrow: string; title: string; intro: string; notice?: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} image="/img/dest-hills.png" />
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          {notice && (
            <p className="mb-10 flex gap-3 rounded-2xl bg-[#fff7e3] p-4 text-sm text-navy ring-1 ring-gold/30">
              <Info className="mt-0.5 size-4 shrink-0 text-[#b7860b]" /> {notice}
            </p>
          )}
          <div className="space-y-10">{children}</div>
        </div>
      </section>
    </>
  )
}

export function PolicySection({ title, children, badge }: { title: string; children: React.ReactNode; badge?: string }) {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-2xl font-semibold text-navy">{title}</h2>
        {badge && <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">{badge}</span>}
      </div>
      <div className="mt-3 space-y-3 leading-relaxed text-navy/80">{children}</div>
    </section>
  )
}
