import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '@/data/fixtures'
import { img } from '@/lib/tours'
import { cn } from '@/lib/utils'
import { Picture } from './primitives'

/** Masonry gallery with a keyboard- and swipe-friendly full-screen lightbox. */
export function Gallery({ items, className }: { items: GalleryItem[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)
  const close = useCallback(() => setIndex(null), [])
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length])

  useEffect(() => {
    if (index === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index, close, step])

  const current = index !== null ? items[index] : null

  return (
    <>
      <ul className={cn('columns-2 gap-3 sm:gap-4 lg:columns-3', className)}>
        {items.map((item, i) => (
          <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
            <button type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-2xl bg-secondary text-left focus-visible:ring-4 focus-visible:ring-turquoise/40 focus-visible:outline-none">
              <Picture src={item.src} alt={item.alt} widths={[360, 640]} sizes="(min-width: 1024px) 33vw, 50vw" className="w-full transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-3 pt-10 text-[12px] font-medium text-white opacity-100 transition sm:text-[13px] lg:opacity-0 lg:group-hover:opacity-100">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-navy/97 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          <div className="flex items-center justify-between p-4 text-sm text-white/70">
            <span>
              {index! + 1} / {items.length}
            </span>
            <button type="button" onClick={close} aria-label="Close" autoFocus className="grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4" onClick={(e) => e.target === e.currentTarget && close()}>
            <img src={img(current.src, 1600, 85)} alt={current.alt} className="max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl" />
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 hidden size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 hidden size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid">
              <ChevronRight className="size-6" />
            </button>
          </div>
          <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] text-center">
            <p className="font-display text-lg text-white">{current.caption}</p>
            <p className="mt-1 text-xs text-white/50">{current.authentic ? 'Photo: NP Service' : `${current.credit} · Destination illustration`}</p>
          </div>
        </div>
      )}
    </>
  )
}
