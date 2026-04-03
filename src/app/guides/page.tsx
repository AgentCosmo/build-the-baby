import Link from 'next/link'
import { guides } from '@/lib/guides'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baby Registry Guides & Tips — Build The Baby',
  description:
    'Expert guides for building your baby registry: budget picks, safety reviews, and everything first-time parents need to know.',
}

export default function GuidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-rose-50 to-stone-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium mb-6">
            <span>📖</span> Expert Advice for New Parents
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
            Baby Registry Guides &amp; Tips
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            In-depth guides to help you build a smarter baby registry — with honest picks, budget
            breakdowns, and safety-first advice from parents who&apos;ve been there.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-200 p-6 flex flex-col gap-4 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl">
                  {guide.emoji}
                </div>
                <span className="text-xs text-stone-400 font-medium mt-1">
                  {guide.readTime} min read
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-stone-800 group-hover:text-amber-600 transition-colors leading-snug">
                  {guide.title}
                </h2>
                <p className="text-stone-500 text-sm mt-2 leading-relaxed line-clamp-3">
                  {guide.intro}
                </p>
              </div>

              <div className="flex items-center text-sm font-semibold text-amber-600 group-hover:text-amber-700 transition-colors mt-auto">
                Read Guide
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-stone-50 to-amber-50 border-t border-amber-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl font-bold text-stone-800 mb-3">Ready to build your registry?</p>
          <p className="text-stone-500 mb-6 leading-relaxed">
            Browse our curated picks across 8 categories and start adding items to your registry.
          </p>
          <Link
            href="/#categories"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors shadow-md"
          >
            Browse Categories →
          </Link>
        </div>
      </section>
    </>
  )
}
