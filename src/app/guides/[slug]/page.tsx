import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getGuideBySlug } from '@/lib/guides'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  }
}

function toId(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-stone-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-stone-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  )
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const formattedDate = new Date(guide.updatedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      {/* Breadcrumb + Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-rose-50 to-stone-50 border-b border-amber-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-stone-600 transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-stone-600 transition-colors">
              Guides
            </Link>
            <span>›</span>
            <span className="text-stone-600 font-medium">{guide.title}</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white border border-amber-200 flex items-center justify-center text-4xl shadow-sm shrink-0">
              {guide.emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 leading-tight">
                {guide.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-stone-400">
                <span>{guide.readTime} min read</span>
                <span aria-hidden="true">·</span>
                <span>Updated {formattedDate}</span>
              </div>
            </div>
          </div>

          <p className="text-lg text-stone-600 leading-relaxed">{guide.intro}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Table of Contents */}
        <nav
          className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-12"
          aria-label="Table of contents"
        >
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
            In This Guide
          </p>
          <ol className="space-y-2">
            {guide.sections.map((section, i) => (
              <li key={i}>
                <a
                  href={`#${toId(section.heading)}`}
                  className="text-sm text-amber-700 hover:text-amber-900 hover:underline transition-colors"
                >
                  {i + 1}. {section.heading}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#faq"
                className="text-sm text-amber-700 hover:text-amber-900 hover:underline transition-colors"
              >
                {guide.sections.length + 1}. Frequently Asked Questions
              </a>
            </li>
          </ol>
        </nav>

        {/* Article sections */}
        <article className="space-y-14">
          {guide.sections.map((section, i) => (
            <section key={i} id={toId(section.heading)}>
              <h2 className="text-2xl font-bold text-stone-800 mb-5 scroll-mt-24">
                {section.heading}
              </h2>

              {/* Body paragraphs */}
              <div className="space-y-4">
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-stone-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Product cards */}
              {section.products && section.products.length > 0 && (
                <div className="mt-8 space-y-4">
                  {section.products.map((product, k) => (
                    <div
                      key={k}
                      className="bg-white border border-stone-100 rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row gap-5"
                    >
                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start gap-2 mb-2">
                          <h3 className="font-bold text-stone-800 leading-snug">{product.name}</h3>
                          {product.badge && (
                            <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          <StarRating rating={product.rating} />
                          <span className="text-lg font-bold text-stone-800">{product.price}</span>
                        </div>

                        <p className="text-sm text-stone-500 leading-relaxed mb-3">
                          {product.description}
                        </p>

                        {/* Pros */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                          {product.pros.map((pro, l) => (
                            <div key={l} className="flex items-start gap-1.5 text-xs text-stone-600">
                              <span className="text-green-500 mt-0.5 shrink-0" aria-hidden="true">
                                ✓
                              </span>
                              <span>{pro}</span>
                            </div>
                          ))}
                        </div>

                        {/* Con */}
                        {product.con && (
                          <div className="flex items-start gap-1.5 text-xs text-stone-500 mt-2">
                            <span className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true">
                              △
                            </span>
                            <span>{product.con}</span>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="shrink-0 flex sm:flex-col justify-end sm:justify-center">
                        <a
                          href={product.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                        >
                          View on Amazon →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 scroll-mt-24">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {guide.faq.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white border border-stone-100 rounded-2xl shadow-sm"
                >
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                    <span className="font-semibold text-stone-700 text-sm leading-snug">
                      {item.q}
                    </span>
                    <span className="shrink-0 text-stone-400 group-open:rotate-180 transition-transform text-base leading-none select-none">
                      ▾
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-stone-500 leading-relaxed border-t border-stone-50 pt-3">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </article>

        {/* Related Guides */}
        {(() => {
          const relatedGuides = guides.filter((g) => g.slug !== slug).slice(0, 3)
          return relatedGuides.length > 0 ? (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-stone-800 mb-6">More Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="group bg-white border border-stone-100 rounded-2xl shadow-sm p-5 hover:border-amber-200 hover:shadow-md transition-all flex flex-col gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl shrink-0">
                      {g.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stone-800 text-sm leading-snug mb-1 group-hover:text-amber-700 transition-colors">
                        {g.title}
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{g.intro}</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">
                      Read Guide →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        })()}

        {/* Registry CTA */}
        <div className="mt-16 bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl border border-amber-200 p-8 text-center">
          <p className="text-xl font-bold text-stone-800 mb-2">Ready to build your registry?</p>
          <p className="text-stone-500 mb-5 text-sm">
            Browse our curated picks across 8 categories and start adding items.
          </p>
          <Link
            href="/#categories"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-2xl transition-colors shadow-md"
          >
            Browse Categories →
          </Link>
        </div>

        {/* Affiliate disclosure */}
        <p className="text-xs text-stone-400 border-t border-stone-100 pt-6 mt-8 leading-relaxed">
          <strong>Affiliate disclosure:</strong> &ldquo;View on Amazon&rdquo; links are Amazon
          Associates affiliate links. We earn a small commission on qualifying purchases at no extra
          cost to you. Prices and availability may vary.
        </p>
      </div>
    </>
  )
}
