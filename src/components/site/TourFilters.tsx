import { nextDeparture, publishedTours } from '@/lib/tours'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', label: 'All Tours' },
  { id: 'upcoming', label: 'Upcoming Departures' },
  { id: 'north-india', label: 'North India' },
  { id: 'south-india', label: 'South India' },
  { id: 'hill-station', label: 'Hill Stations' },
  { id: 'pilgrimage', label: 'Pilgrimage Tours' },
] as const
export type FilterId = (typeof filters)[number]['id']

export function filterTours(id: FilterId) {
  return publishedTours().filter((t) => {
    if (id === 'all') return true
    if (id === 'upcoming') return Boolean(nextDeparture(t.id))
    if (id === 'north-india' || id === 'south-india') return t.region === id
    return t.tags.includes(id)
  })
}

export function TourFilters({ value, onChange, tone = 'dark' }: { value: FilterId; onChange: (id: FilterId) => void; tone?: 'dark' | 'light' }) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter tours">
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          role="tab"
          aria-selected={value === f.id}
          onClick={() => onChange(f.id)}
          className={cn(
            'h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition',
            value === f.id ? 'bg-navy text-white shadow-md' : tone === 'dark' ? 'bg-white text-navy ring-1 ring-border hover:ring-turquoise' : 'bg-white/10 text-white',
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

