import { Link, createFileRoute } from '@tanstack/react-router'
import { Lock, ShieldCheck } from 'lucide-react'
import { seo } from '@/lib/seo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/site/Logo'
import { Picture } from '@/components/site/primitives'

export const Route = createFileRoute('/admin/login')({
  head: () => seo({ title: 'Admin Sign In | NP Service', description: 'NP Service staff sign-in.', path: '/admin/login', noindex: true }),
  component: AdminLogin,
})

function AdminLogin() {
  return (
    <div className="grid min-h-screen bg-navy lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Picture src="/img/hero-darjeeling.png" alt="" widths={[1200]} className="absolute inset-0 size-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30" />
        <div className="absolute bottom-12 left-12 max-w-md text-white">
          <p className="font-display text-4xl">Service You Trust Since 1992</p>
          <p className="mt-3 text-white/70">Manage tours, departures, enquiries and published content.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/"><Logo /></Link>
          <h1 className="mt-10 text-2xl font-bold text-white">Staff sign in</h1>
          <p className="mt-2 text-sm text-white/60">Only authorised NP Service administrators can access the dashboard.</p>

          <div className="mt-6 flex gap-3 rounded-xl bg-gold/15 p-4 text-sm text-gold ring-1 ring-gold/30">
            <Lock className="mt-0.5 size-4 shrink-0" />
            <p>Secure sign-in is being connected. Admin accounts will be invited by email — there is no shared or default password.</p>
          </div>

          <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()} aria-disabled="true">
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input id="email" type="email" disabled autoComplete="username" className="h-12 rounded-xl border-white/15 bg-white/5 text-white" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <Input id="password" type="password" disabled autoComplete="current-password" className="h-12 rounded-xl border-white/15 bg-white/5 text-white" />
            </div>
            <button type="submit" disabled className="h-12 cursor-not-allowed rounded-full bg-white/20 font-bold text-white/60">
              Sign in
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between text-sm">
            <Link to="/admin" className="inline-flex items-center gap-2 font-semibold text-turquoise">
              <ShieldCheck className="size-4" /> View dashboard preview
            </Link>
            <Link to="/" className="text-white/50 hover:text-white">Back to website</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
