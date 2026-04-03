import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Build The Baby',
  description:
    'Building a baby registry is overwhelming. We built Build The Baby to cut through the noise — honest, curated picks organized the way parents actually think.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-rose-50 to-stone-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium mb-6">
            <span>🍼</span> Parent-to-Parent
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
            Built by parents, for parents
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Building a baby registry is overwhelming. We built this to cut through the noise — honest,
            curated picks organized the way parents actually think.
          </p>
        </div>
      </section>

      {/* Why we built this */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl">
              💡
            </div>
            <h2 className="text-2xl font-bold text-stone-800">Why we built this</h2>
          </div>
          <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-4">
            <p>
              When we started building our baby registry, we expected the internet to make it easy.
              Instead, we found hundreds of "best baby products" listicles that all recommended the
              same things — without explaining why, or whether any of it was actually worth buying.
            </p>
            <p>
              Most registry guides are either too long to read, too sponsored to trust, or organized
              around how retailers think (not how parents think). Nobody wants to click through 47 tabs
              to figure out if they really need a wipe warmer.
            </p>
            <p>
              So we built the site we wish had existed. Organized by category. Honest about what you
              actually need. Straight about what you can skip. And free from the fluff that clutters
              every other baby product site.
            </p>
          </div>
        </div>
      </section>

      {/* How we pick products */}
      <section className="bg-amber-50/50 border-y border-amber-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-stone-800 mb-2">How we pick products</h2>
            <p className="text-stone-500">Three things guide every recommendation we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-bold text-stone-800 mb-2">Safety first</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Every product we feature meets or exceeds current safety standards. For high-stakes
                items like car seats and cribs, we go further — checking independent test results,
                not just the manufacturer's claims.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-bold text-stone-800 mb-2">Value-focused</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                We look for the best product at each price point — not the most expensive. Most parents
                don't need to spend $300 on a baby monitor or $900 on a stroller. We show you what
                actually works at a price that doesn't hurt.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="font-bold text-stone-800 mb-2">Honest opinions</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                We include what we'd actually recommend to a friend — pros, cons, and sometimes a note
                that says "you probably don't need this." Affiliate commissions help keep the site free,
                but they never influence which products we recommend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-2xl font-bold text-stone-800 mb-3">Ready to start building?</p>
        <p className="text-stone-500 mb-8 leading-relaxed">
          Browse our curated picks across all eight categories — organized the way parents actually
          shop, not the way retailers want you to.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#categories"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors shadow-md"
          >
            Browse Categories →
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold px-8 py-3.5 rounded-2xl border border-stone-200 transition-colors"
          >
            Read Our Guides
          </Link>
        </div>
      </section>
    </>
  )
}
