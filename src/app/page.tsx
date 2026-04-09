import Link from 'next/link'
import { categories } from '@/lib/data'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-100 opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-100 opacity-40 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium mb-6">
            <span>✨</span> The one-stop planner for new parents
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-6">
            Build Your Complete{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">
              Baby Registry
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            Stop drowning in blog posts and &ldquo;top 10&rdquo; listicles. Pick your categories,
            browse curated gear, and build a registry your whole family can shop from — one
            category at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base px-8 py-3.5 rounded-2xl transition-colors shadow-md"
            >
              Browse Categories <span>→</span>
            </a>
            <Link
              href="/category/sleep"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-base px-8 py-3.5 rounded-2xl transition-colors border border-stone-200 shadow-sm"
            >
              Start with Sleep 🌙
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-y border-amber-100 py-6">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '8', label: 'Categories' },
            { value: '39+', label: 'Curated Products' },
            { value: '100%', label: 'Honest Picks' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-amber-500">{value}</p>
              <p className="text-sm text-stone-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Starter Builds CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/starter-builds"
          className="group flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 rounded-2xl px-6 py-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">✨</span>
            <div>
              <p className="font-bold text-stone-800 text-base">Not sure where to start?</p>
              <p className="text-stone-500 text-sm mt-0.5">Try a Starter Build — pre-made registries for every budget.</p>
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 bg-amber-500 group-hover:bg-amber-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
            Try a Starter Build <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </Link>
      </section>

      {/* Category Cards */}
      <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-3">Shop by Category</h2>
          <p className="text-stone-500 text-lg">
            Every essential, organized the way you think — not the way advertisers do.
          </p>
        </div>

        {(() => {
          const remainder = categories.length % 3
          const mainCategories = remainder > 0 ? categories.slice(0, -remainder) : categories
          const lastRowCategories = remainder > 0 ? categories.slice(-remainder) : []

          const renderCard = (category: typeof categories[0], fullWidth = false) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-200 p-6 flex flex-col gap-4 hover:-translate-y-0.5${fullWidth ? ' w-full' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl border ${category.color}`}
                >
                  {category.emoji}
                </div>
                <span className="text-xs text-stone-400 font-medium mt-1">
                  {category.products.length} picks
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-800 group-hover:text-amber-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-stone-500 text-sm mt-1 leading-relaxed">{category.tagline}</p>
              </div>

              {/* Top product preview */}
              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs text-stone-400 uppercase tracking-wide font-semibold mb-1">
                  Top Pick
                </p>
                <p className="text-sm text-stone-600 font-medium truncate">
                  {category.products[0]?.name}
                </p>
              </div>

              <div className="flex items-center text-sm font-semibold text-amber-600 group-hover:text-amber-700 transition-colors mt-auto">
                Browse {category.name}
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          )

          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {mainCategories.map((cat) => renderCard(cat))}
              </div>
              {lastRowCategories.length > 0 && (
                <div className="flex justify-center items-stretch gap-5 mt-5">
                  {lastRowCategories.map((cat) => (
                    <div key={cat.slug} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex">
                      {renderCard(cat, true)}
                    </div>
                  ))}
                </div>
              )}
            </>
          )
        })()}
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-br from-stone-50 to-amber-50 border-t border-amber-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Pick a Category',
                desc: 'Start with what matters most — sleep, feeding, travel, and more.',
                emoji: '📋',
              },
              {
                step: '02',
                title: 'Browse Curated Picks',
                desc: 'Each product is hand-selected for quality, safety, and value.',
                emoji: '🔍',
              },
              {
                step: '03',
                title: 'Buy on Amazon (Same Price)',
                desc: "Click through to Amazon. You pay the same price — we just earn a small affiliate commission that keeps this site free.",
                emoji: '🛒',
              },
            ].map(({ step, title, desc, emoji }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white border border-amber-200 flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
                  {emoji}
                </div>
                <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">
                  Step {step}
                </p>
                <h3 className="text-lg font-bold text-stone-800 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
